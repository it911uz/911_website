from typing import Generic, Type, TypeVar

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from repository.query_builder import QueryBuilder

ModelType = TypeVar("ModelType")

class BaseRepository(Generic[ModelType]):
    def __init__(self, db: AsyncSession, model: Type[ModelType]):
        self.db = db
        self.model = model

    async def create(self, **kwargs) -> ModelType:
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
            paginator=None,
            sorter=None,
    ):
        stmt = select(self.model)

        builder = QueryBuilder(
            stmt=stmt,
            db=self.db,
            filters=filters,
            sorter=sorter,
            paginator=paginator,
        )
        stmt = await builder.build()
        result = await self.db.execute(stmt)
        items = result.scalars().all()

        return {
            "data": items,
            "pagination": paginator.to_dict() if paginator else None,
        }
