from fastapi import APIRouter, Depends
from fastapi_pagination import Page
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_db
from schemas.company import CompanyRead
from services.company_manager import CompanyManager

router = APIRouter(
    prefix="/companies",
    tags=["company"],
)


@cbv(router)
class CompanyCBV:
    db: AsyncSession = Depends(get_db)
    @router.get(
        "/",
        response_model=Page[CompanyRead]
    )
    async def get_companies(
            self
    ):
        pass

    @router.get(
        "/{company_id}",
        response_model=CompanyRead
    )
    async def get_company(
            self,
            company_id: int
    ):
        pass

    @router.post(
        "/",
    )
    async def create_company(
            self,
    ):
        pass

    @router.put(
        "/{company_id}",
    )
    async def update_company(
            self,
            company_id: int,
    ):
        pass

    @router.delete(
        "/{company_id}",
    )
    async def delete_company(
            self,
            company_id: int
    ):
        pass
