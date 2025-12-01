from typing import TypeVar, Any

from fastapi_pagination import Page, Params
from fastapi_pagination.ext.sqlalchemy import paginate

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

ModelType = TypeVar("ModelType")


class BaseRepository:
    model = None

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(
            self,
            **kwargs
    ):
        obj = self.model(**kwargs)
        self.db.add(obj)
        await self.db.commit()
        await self.db.refresh(obj)
        return obj

    async def update(self, obj: ModelType) -> None:
        self.db.add(obj)
        await self.db.commit()

    async def delete(self, obj: ModelType) -> None:
        await self.db.delete(obj)
        await self.db.commit()

    async def get(self, obj_id) -> ModelType:
        result = await self.db.execute(
            select(self.model).where(self.model.id == obj_id)
        )
        return result.scalar_one_or_none()

    async def list(
            self,
            filters=None,
            params: Params = None
    ):
        stmt = select(self.model)

        if filters:
            stmt = filters.filter(stmt)
            print(stmt)
            stmt = filters.sort(stmt)

        if not params:
            result = await self.db.execute(stmt)
            items = result.scalars().all()
            return items

        if not params.size:
            result = await self.db.execute(stmt)
            items = result.scalars().all()
            return Page(
                items=[item.as_dict() for item in items],
                page=1,
                size=len(items) if len(items) >= 1 else 1,
                pages=1,
                total=len(items)
            )

        return await paginate(self.db, stmt)

    async def check_unique(
            self,
            field_name: str,
            field_value: Any,
            obj_id: Any | None = None,
    ):
        stmt = select(self.model).where(getattr(self.model, field_name) == field_value)
        stmt = stmt if obj_id is None else stmt.where(self.model.id != obj_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()
