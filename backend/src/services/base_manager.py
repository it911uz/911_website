from typing import Generic, Type

from fastapi_pagination import Params
from sqlalchemy.ext.asyncio import AsyncSession

from exceptions import NotFound
from repository.base_repo import ModelType, BaseRepository

from utils.cache import redis_cache

class BaseManager(Generic[ModelType]):
    def __init__(self, db: AsyncSession, model: Type[ModelType]):
        self.db = db
        self.repo = BaseRepository(db, model)
        self.model = model

    def _cache_key(self, suffix: str):
        """Генерация уникального ключа для модели"""
        return f"{self.model.__name__.lower()}:{suffix}"

    async def get(self, obj_id) -> ModelType:
        key = self._cache_key(f"id:{obj_id}")
        cached = await redis_cache.get(key)
        if cached:
            return self.model(**cached)

        obj = await self.repo.get(obj_id)
        if not obj:
            raise NotFound(f"{self.model.__name__} not found")

        await redis_cache.set(key, obj.as_dict())
        return obj

    async def list(self, filters=None, params: Params = None):
        pagination = f"{params.page}:{params.size}" if params.size else "all"
        key = self._cache_key(f"list:{hash(str(filters))}:{pagination}")

        cached = await redis_cache.get(key)
        if cached:
            return cached
        result = await self.repo.list(filters=filters, params=params)
        await redis_cache.set(key, result.model_dump())
        return result

    async def create(self, **kwargs):
        obj = await self.repo.create(**kwargs)
        await redis_cache.delete_pattern(self._cache_key("list:*"))
        return obj

    async def update(self, obj_id, **kwargs):
        obj = await self.get(obj_id)
        for k, v in kwargs.items():
            setattr(obj, k, v)
        await self.repo.update(obj)
        await redis_cache.delete(self._cache_key(f"id:{obj_id}"))
        await redis_cache.delete_pattern(self._cache_key("list:*"))
        return obj

    async def delete(self, obj_id):
        obj = await self.get(obj_id)
        await self.repo.delete(obj)
        await redis_cache.delete(self._cache_key(f"id:{obj_id}"))
        await redis_cache.delete_pattern(self._cache_key("list:*"))
