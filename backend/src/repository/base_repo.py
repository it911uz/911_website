from typing import Generic, Type, TypeVar

from fastapi_pagination import Params, Page
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi_pagination.ext.sqlalchemy import paginate

ModelType = TypeVar("ModelType")


class BaseRepository(Generic[ModelType]):
    def __init__(self, db: AsyncSession, model: Type[ModelType]):
        self.db = db
        self.model = model

    async def create(self, commit=True, **kwargs) -> ModelType:
        obj = self.model(**kwargs)
        self.db.add(obj)
        await self.db.flush()
        if commit:
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
            stmt = filters.sort(stmt)

        if not params.size:
            result = await self.db.execute(stmt)
            items = result.scalars().all()
            return Page(
                items=[item.as_dict() for item in items],
                page=1,
                size=len(items) if len(items) >=1 else 1,
                pages=1,
                total=len(items)
            )

        return await paginate(self.db, stmt)
