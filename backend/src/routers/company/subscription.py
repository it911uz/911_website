from fastapi import APIRouter, Depends
from fastapi_pagination import Page
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_db
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
        response_model=Page[SubscriptionRead]
    )
    async def get_company_subscriptions(
            self,
            company_id: int,

    ):
        pass

    @router.get(
        "/{company_subscription_id}",
        response_model=SubscriptionRead
    )
    async def get_company_subscription(
            self,
            company_id: int,
            company_subscription_id: int
    ):
        pass

    @router.post(
        "/",
    )
    async def create_company_subscription(
            self,
            company_id: int,
            request: SubscriptionCreate
    ):
        pass

    @router.put(
        "/{company_subscription_id}",
    )
    async def update_company_subscription(
            self,
            company_id: int,
            company_subscription_id: int,
            request: SubscriptionUpdate
    ):
        pass

    @router.delete(
        "/{company_subscription_id}",
    )
    async def delete_company_subscription(
            self,
            company_id: int,
            company_subscription_id: int
    ):
        pass
