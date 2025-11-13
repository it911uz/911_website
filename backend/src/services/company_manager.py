from sqlalchemy.ext.asyncio import AsyncSession

from models.company import Company, CompanyContact, Subscription, CompanyComment
from services.base_manager import BaseManager


class CompanyManager(BaseManager[Company]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Company)


class CompanyContactManager(BaseManager[CompanyContact]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, CompanyContact)


class CompanySubscriptionManager(BaseManager[Subscription]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Subscription)


class CompanyCommentManager(BaseManager[CompanyComment]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, CompanyComment)
