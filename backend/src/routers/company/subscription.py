from fastapi import APIRouter, Depends
from fastapi_pagination import Page
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_db
from schemas.company import CompanyRead
from services.company_manager import CompanySubscriptionManager

router = APIRouter(
    prefix="/companies/{company_id}/subscriptions",
    tags=["company"],
)


@cbv(router)
class CompanySubscriptionCBV:
    db: AsyncSession = Depends(get_db)
    @router.get(
        "/",
        response_model=Page[CompanyRead]
    )
    async def get_company_subscriptions(
            self,
            company_id: int,
    ):
        pass

    @router.get(
        "/{company_subscription_id}",
        response_model=CompanyRead
    )
    async def get_company_contact(
            self,
            company_id: int
    ):
        pass

    @router.post(
        "/",
    )
    async def create_company_contact(
            self,
    ):
        pass

    @router.put(
        "/{company_subscription_id}",
    )
    async def update_company_contact(
            self,
            company_id: int,
    ):
        pass

    @router.delete(
        "/{company_subscription_id}",
    )
    async def delete_company_contact(
            self,
            company_id: int
    ):
        pass
