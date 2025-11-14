from typing import Type

from sqlalchemy.ext.asyncio import AsyncSession

from exceptions import NotFound
from models.company import Company, CompanyContact, Subscription, CompanyComment
from repository.base_repo import ModelType
from repository.company_repo import CompanyRepository, CompanyBaseRepository
from services.base_manager import BaseManager
from utils.cache import redis_cache


class CompanyManager(BaseManager[Company]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Company)


class CompanyBaseManager(BaseManager[ModelType]):
    def __init__(self, db: AsyncSession, model: Type[ModelType], company_id: int):
        super().__init__(db, model)
        self.repo = CompanyBaseRepository(db, self.model)
        self.company_repo = CompanyRepository(db, Company)
        self.company_id = company_id

    @classmethod
    async def build(cls, db: AsyncSession, model: Type[ModelType], company_id: int):
        self = cls(db=db, model=model, company_id=company_id)
        await self._found_company(company_id)
        return self

    async def _found_company(self, company_id: int):
        company = await self.company_repo.get(company_id)
        if not company:
            raise NotFound('Company not found')

    async def list_all(
            self,
            filters=None
    ):
        key = self._cache_key(f"list:{hash(str(filters))}")
        cached = await redis_cache.get(key)
        if cached:
            return cached
        result = await self.repo.list_all(self.company_id, filters=filters)
        await redis_cache.set(key, result)
        return result


class CompanyContactManager(CompanyBaseManager[CompanyContact]):
    pass


class CompanySubscriptionManager(CompanyBaseManager[Subscription]):
    pass


class CompanyCommentManager(CompanyBaseManager[CompanyComment]):
    pass
