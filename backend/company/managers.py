from sqlalchemy.ext.asyncio import AsyncSession

from company.repository import CompanyRepository, CompanyCommentRepository, CompanyContactRepository, \
    CompanySubscriptionRepository, PaymentRepository
from core.exceptions import NotFound, Forbidden
from core.manager import BaseManager
from core.repository import ModelType


class CompanyManager(BaseManager):
    repo_class = CompanyRepository


class CompanyNestedMixin:
    async def _check_company(self, obj_id: int):
        company = await self.company_repo.get(self.company_id)
        if not company:
            raise NotFound(f"Company with id {self.company_id} not found")
        obj = await self.repo.get(obj_id)
        if not obj:
            raise NotFound(f"Company Comment with id {self.company_id} not found")
        if obj.company_id != company.id:
            raise Forbidden(f"Company Comment with id {obj_id} does not belong to this lead")

    async def get(self, obj_id, **kwargs) -> ModelType:
        await self._check_company(obj_id)
        return await super().get(obj_id)

    async def delete(self, obj_id):
        await self._check_company(obj_id)
        return await super().delete(obj_id)

    async def update(self, obj_id, **kwargs):
        await self._check_company(obj_id)
        return await super().update(obj_id, **kwargs)


class CompanyCommentManager(CompanyNestedMixin, BaseManager):
    repo_class = CompanyCommentRepository
    fk_fields = {
        "company_id": CompanyRepository
    }

    def __init__(self, db: AsyncSession, company_id: int):
        super().__init__(db)
        self.company_id = company_id
        self.company_repo = CompanyRepository(db)


class CompanyContactManager(CompanyNestedMixin, BaseManager):
    repo_class = CompanyContactRepository
    fk_fields = {
        "company_id": CompanyRepository
    }

    def __init__(self, db: AsyncSession, company_id: int):
        super().__init__(db)
        self.company_id = company_id
        self.company_repo = CompanyRepository(db)


class CompanySubscriptionManager(CompanyNestedMixin, BaseManager):
    repo_class = CompanySubscriptionRepository
    fk_fields = {
        "company_id": CompanyRepository
    }

    def __init__(self, db: AsyncSession, company_id: int):
        super().__init__(db)
        self.company_id = company_id
        self.company_repo = CompanyRepository(db)


class PaymentManager(BaseManager):
    repo_class = PaymentRepository
    fk_fields = {
        "subscription_id": CompanySubscriptionRepository
    }

    def __init__(self, db: AsyncSession, company_id: int, subscription_id: int):
        super().__init__(db)
        self.company_id = company_id
        self.company_repo = CompanyRepository(db)
        self.subscription_id = subscription_id
        self.subscription_repo = CompanySubscriptionRepository(db)

    async def _check(self, obj_id: int | None = None):
        company = await self.company_repo.get(self.company_id)
        if not company:
            raise NotFound(f"Company with id {self.company_id} not found")
        subscription = await self.subscription_repo.get(self.subscription_id)
        if not subscription:
            raise NotFound(f"Subscription with id {self.subscription_id} not found")

        if company.id != subscription.company_id:
            raise Forbidden(f"Company with id {self.company_id} does not belong to this Subscription")
        if obj_id is not None:

            payment = await self.repo.get(obj_id)
            print(payment)
            if not payment:
                raise NotFound(f"Payment with id {obj_id} not found")
            print("Hello")
            if subscription.id != payment.subscription_id:
                raise Forbidden(f"Subscription with id {self.subscription_id} does not belong to this Payment")
            print("Hello")
            return payment

    async def delete(self, obj_id):
        await self._check(obj_id)
        return await super().delete(obj_id)

    async def update(self, obj_id, **kwargs):
        await self._check(obj_id)
        return await super().update(obj_id, **kwargs)

    async def create(self, **kwargs):
        await self._check()
        return await super().create(**kwargs)
