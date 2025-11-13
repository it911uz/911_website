from fastapi import APIRouter
from fastapi_pagination import Page
from fastapi_utils.cbv import cbv

from schemas.company import CompanyRead

router = APIRouter(
    prefix="/companies",
    tags=["company"],
)


@cbv(router)
class CompanyCBV:

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
