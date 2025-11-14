from sqlalchemy import select

from models.company import Company
from repository.base_repo import BaseRepository, ModelType


class CompanyRepository(BaseRepository[Company]):
    pass


class CompanyBaseRepository(BaseRepository[ModelType]):
    async def list_all(
            self,
            company_id: int,
            filters=None
    ):
        stmt = select(self.model).where(self.model.company_id == company_id)

        if filters:
            stmt = filters.filter(stmt)
            stmt = filters.sort(stmt)

        result = await self.db.execute(stmt)
        items = result.scalars().all()

        return items

