from fastapi import APIRouter, Depends
from fastapi_filter import FilterDepends
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_db
from filters.company_filter import CompanySubscriptionFilter
from models.company import Subscription
from schemas.company import SubscriptionCreate, SubscriptionUpdate, SubscriptionRead
from services.company_manager import CompanySubscriptionManager

router = APIRouter(
    prefix="/{company_id}/subscriptions",
    tags=["company"],
)


@cbv(router)
class CompanySubscriptionCBV:
    db: AsyncSession = Depends(get_db)

    @router.get(
        "/",
        response_model=list[SubscriptionRead]
    )
    async def get_company_subscriptions(
            self,
            company_id: int,
            filters: CompanySubscriptionFilter = FilterDepends(CompanySubscriptionFilter)
    ):
        manager = await CompanySubscriptionManager.build(
            db=self.db,
            model=Subscription,
            company_id=company_id
        )
        response = await manager.list_all(
            filters=filters
        )
        return response

    @router.get(
        "/{company_subscription_id}",
        response_model=SubscriptionRead
    )
    async def get_company_subscription(
            self,
            company_id: int,
            company_subscription_id: int
    ):
        manager = await CompanySubscriptionManager.build(
            db=self.db,
            model=Subscription,
            company_id=company_id
        )
        response = await manager.get(
            company_subscription_id
        )
        return response

    @router.post(
        "/",
    )
    async def create_company_subscription(
            self,
            company_id: int,
            request: SubscriptionCreate
    ):
        manager = await CompanySubscriptionManager.build(
            db=self.db,
            model=Subscription,
            company_id=company_id
        )
        response = await manager.create(
            company_id=company_id,
            **request.model_dump()
        )
        return response

    @router.put(
        "/{company_subscription_id}",
    )
    async def update_company_subscription(
            self,
            company_id: int,
            company_subscription_id: int,
            request: SubscriptionUpdate
    ):
        manager = await CompanySubscriptionManager.build(
            db=self.db,
            model=Subscription,
            company_id=company_id
        )
        await manager.update(
            company_subscription_id,
            **request.model_dump()
        )

    @router.delete(
        "/{company_subscription_id}",
    )
    async def delete_company_subscription(
            self,
            company_id: int,
            company_subscription_id: int
    ):
        manager = await CompanySubscriptionManager.build(
            db=self.db,
            model=Subscription,
            company_id=company_id
        )
        await manager.delete(
            company_subscription_id
        )
