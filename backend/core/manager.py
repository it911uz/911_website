from typing import Any

from fastapi_pagination import Params, Page
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from core.exceptions import NotFound, Conflict
from core.repository import BaseRepository, ModelType
from core.services import RedisService


class FKValidationMixin:
    fk_fields: dict[str, type[BaseRepository]] = {}

    async def _validate_fk(
            self,
            field_id,
            repo: BaseRepository
    ):
        obj = await repo.get(field_id)
        if not obj:
            raise NotFound(
                detail="Not found"
            )

    async def validate_fk(self, db: AsyncSession, data: dict[str, Any]):

        for field, repo_class in self.fk_fields.items():
            field_id = data.get(field)
            if field_id:
                repo = repo_class(db)
                await self._validate_fk(field_id, repo)


class UniqueCheckMixin:
    unique_fields: list[str] = []

    async def _check_unique(
            self,
            repo: BaseRepository,
            field_name: str,
            field_value: Any,
            obj_id: Any | None = None
    ):
        obj = await repo.check_unique(
            field_name,
            field_value,
            obj_id
        )
        if obj:
            raise Conflict(
                "Already Exists",
            )

    async def check_unique(
            self,
            repo: BaseRepository,
            data: dict[str, Any],
            obj_id: Any | None = None,
    ):
        for field in self.unique_fields:
            field_value = data.get(field)

            if field_value is not None:
                await self._check_unique(repo, field, field_value, obj_id)


class CacheMixin:
    cache_entity: str
    cache: RedisService = RedisService()
    read_schema: type[BaseModel]

    async def get(self, obj_id, **kwargs):
        key = self.cache.key(self.cache_entity, obj_id)
        data = await self.cache.get(key)
        if data:
            return data
        obj = self.read_schema.model_validate(await super().get(obj_id))
        await self.cache.set(key, obj.model_dump())
        return obj

    async def list(
            self,
            filters=None, params: Params = None
    ):
        key = self.cache.key(
            self.cache_entity,
            filters=filters,
            params=params
        )
        data = await self.cache.get(key)
        if data:
            return data
        data = await super().list(filters, params)
        if not isinstance(data, Page):
            data = [
                self.read_schema.model_validate(obj).model_dump() for obj in data
            ]
        else:
            data = data.model_dump()
            print(data)
        await self.cache.set(key, data)
        return data

    async def create(self, **kwargs):
        await self.cache.delete(self.cache_entity)
        return await super().create(**kwargs)

    async def update(self, obj_id, **kwargs):
        await self.cache.delete(self.cache_entity)
        return await super().update(obj_id, **kwargs)

    async def delete(self, obj_id):
        await self.cache.delete(self.cache_entity)
        return await super().delete(obj_id)


class BaseManager(FKValidationMixin, UniqueCheckMixin):
    repo_class: type[BaseRepository]
    observers: list = []

    def __init__(self, db: AsyncSession):
        self.db = db
        self.repo = self.repo_class(db)

    async def _notify(
            self,
            event: str,
            obj
    ):
        for observer in self.observers:
            handler = getattr(observer, event, None)
            if handler:
                await handler(obj)

    async def get(self, obj_id, **kwargs) -> ModelType:
        obj = await self.repo.get(obj_id)
        if not obj:
            raise NotFound("Not found")
        return obj

    async def list(self, filters=None, params: Params = None):
        result = await self.repo.list(filters=filters, params=params)
        return result

    async def create(self, **kwargs):
        await self.validate_fk(self.db, kwargs)
        await self.check_unique(self.repo, kwargs)
        obj = await self.repo.create(**kwargs)
        # await self._notify("on_create", obj)
        return obj

    async def update(self, obj_id, **kwargs):
        await self.validate_fk(self.db, kwargs)
        await self.check_unique(self.repo, kwargs, obj_id)
        obj = await self.repo.get(obj_id)
        for k, v in kwargs.items():
            setattr(obj, k, v)
        await self.repo.update(obj)
        return obj
        # await self._notify("on_update", obj)

    async def delete(self, obj_id):
        obj = await self.repo.get(obj_id)
        await self.repo.delete(obj)
        # await self._notify("on_delete", obj)
