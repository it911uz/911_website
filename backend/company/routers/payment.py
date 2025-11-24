from fastapi import APIRouter, Depends
from fastapi_filter import FilterDepends
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from auth.dependencies import has_permission
from company.filters import PaymentFilter
from company.managers import PaymentManager
from company.schemas import PaymentCreate, PaymentUpdate, PaymentRead
from core.dependencies import get_db

router = APIRouter(
    prefix="/{subscription_id}/payments",
    tags=["company"]
)


@cbv(router)
class PaymentCBV:
    db: AsyncSession = Depends(get_db)

    @router.get(
        "/",
        response_model=list[PaymentRead],
        dependencies=[Depends(has_permission("view_payments"))]
    )
    async def get_payments(
            self,
            company_id: int,
            subscription_id: int,
            filters: PaymentFilter = FilterDepends(PaymentFilter),
    ):
        manager = PaymentManager(
            db=self.db,
            company_id=company_id,
            subscription_id=subscription_id
        )
        response = await manager.list(filters=filters)
        return response

    @router.post(
        "/",
        status_code=status.HTTP_201_CREATED,
        response_model=PaymentRead,
        dependencies=[Depends(has_permission("create_payments"))]
    )
    async def create_payment(
            self,
            company_id: int,
            subscription_id: int,
            request: PaymentCreate,
    ):
        manager = PaymentManager(
            db=self.db,
            company_id=company_id,
            subscription_id=subscription_id
        )
        response = await manager.create(
            subscription_id=subscription_id,
            **request.model_dump()
        )
        return response

    @router.put(
        "/{payment_id}",
        status_code=status.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("update_payments"))]
    )
    async def update_payment(
            self,
            company_id: int,
            subscription_id: int,
            payment_id: int,
            request: PaymentUpdate,
    ):
        manager = PaymentManager(
            db=self.db,
            company_id=company_id,
            subscription_id=subscription_id
        )
        await manager.update(
            payment_id,
            **request.model_dump()
        )

    @router.delete(
        "/{payment_id}",
        status_code=status.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("delete_payments"))]
    )
    async def delete_payment(
            self,
            company_id: int,
            subscription_id: int,
            payment_id: int,
    ):
        manager = PaymentManager(
            db=self.db,
            company_id=company_id,
            subscription_id=subscription_id
        )
        await manager.delete(
            payment_id
        )
