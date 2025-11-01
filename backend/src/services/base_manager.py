from typing import Generic, Type

from sqlalchemy.ext.asyncio import AsyncSession

from exceptions import NotFound
from repository.base_repo import ModelType, BaseRepository


class BaseManager(Generic[ModelType]):
    def __init__(self, db: AsyncSession, model: Type[ModelType]):
        self.db = db
        self.repo = BaseRepository(db, model)
        self.model = model

    async def create(self, **kwargs) -> ModelType:
        """Создание объекта"""
        return await self.repo.create(**kwargs)

    async def get(self, obj_id) -> ModelType:
        """Получение по ID"""
        obj = await self.repo.get(obj_id)
        if not obj:
            raise NotFound(f"{self.model.__name__} not found")
        return obj

    async def update(self, obj_id, **kwargs) -> ModelType:
        """Обновление по ID"""
        obj = await self.get(obj_id)
        for k, v in kwargs.items():
            setattr(obj, k, v)
        await self.repo.update(obj)
        return obj

    async def delete(self, obj_id) -> None:
        """Удаление по ID"""
        obj = await self.get(obj_id)
        await self.repo.delete(obj)

    async def list(
        self,
        filters=None
    ):
        """Универсальный метод списка"""
        return await self.repo.list(filters=filters)
