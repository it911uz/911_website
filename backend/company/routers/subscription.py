from fastapi import APIRouter, Depends
from fastapi_filter import FilterDepends
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from auth.dependencies import has_permission
from company.filters import CompanySubscriptionFilter
from company.managers import CompanySubscriptionManager
from company.schemas import SubscriptionRead, SubscriptionCreate, SubscriptionUpdate, SubscriptionMinRead
from core.dependencies import get_db

router = APIRouter(
    prefix="/{company_id}/subscriptions",
    tags=["company"],
)


@cbv(router)
class CompanySubscriptionCBV:
    db: AsyncSession = Depends(get_db)

    @router.get(
        "/",
        response_model=list[SubscriptionRead],
        dependencies=[Depends(has_permission("view_subscriptions"))]
    )
    async def get_company_subscriptions(
            self,
            company_id: int,
            filters: CompanySubscriptionFilter = FilterDepends(CompanySubscriptionFilter)
    ):
        manager = CompanySubscriptionManager(
            db=self.db,
            company_id=company_id
        )
        response = await manager.list(
            filters=filters
        )
        return response

    @router.get(
        "/{company_subscription_id}",
        response_model=SubscriptionRead,
        dependencies=[Depends(has_permission("view_subscriptions"))]
    )
    async def get_company_subscription(
            self,
            company_id: int,
            company_subscription_id: int
    ):
        manager = CompanySubscriptionManager(
            db=self.db,
            company_id=company_id
        )
        response = await manager.get(
            company_subscription_id
        )
        return response

    @router.post(
        "/",
        response_model=SubscriptionMinRead,
        dependencies=[Depends(has_permission("create_subscriptions"))],
        status_code=status.HTTP_201_CREATED
    )
    async def create_company_subscription(
            self,
            company_id: int,
            request: SubscriptionCreate
    ):
        manager = CompanySubscriptionManager(
            db=self.db,
            company_id=company_id
        )
        response = await manager.create(
            company_id=company_id,
            **request.model_dump()
        )
        return response

    @router.put(
        "/{company_subscription_id}",
        status_code=status.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("update_subscriptions"))]
    )
    async def update_company_subscription(
            self,
            company_id: int,
            company_subscription_id: int,
            request: SubscriptionUpdate
    ):
        manager = CompanySubscriptionManager(
            db=self.db,
            company_id=company_id
        )
        await manager.update(
            company_subscription_id,
            **request.model_dump()
        )

    @router.delete(
        "/{company_subscription_id}",
        status_code=status.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("delete_subscriptions"))]
    )
    async def delete_company_subscription(
            self,
            company_id: int,
            company_subscription_id: int
    ):
        manager = CompanySubscriptionManager(
            db=self.db,
            company_id=company_id
        )
        await manager.delete(
            company_subscription_id
        )
