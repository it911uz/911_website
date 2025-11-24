from fastapi import APIRouter, Depends
from fastapi_filter import FilterDepends
from fastapi_pagination import Page, Params
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from auth.dependencies import has_permission
from company.filters import CompanyFilter
from company.managers import CompanyManager
from company.schemas import CompanyRead, CompanyCreate, CompanyUpdate
from core.dependencies import get_db

router = APIRouter(
    prefix="/companies",
    tags=["company"],
)


@cbv(router)
class CompanyCBV:
    db: AsyncSession = Depends(get_db)

    @router.get(
        "/",
        response_model=Page[CompanyRead],
        dependencies=[Depends(has_permission("view_companies"))]
    )
    async def get_companies(
            self,
            filters: CompanyFilter = FilterDepends(CompanyFilter),
            params: Params = Depends(),

    ):
        manager = CompanyManager(db=self.db)
        response = await manager.list(
            filters=filters,
            params=params,
        )
        return response

    @router.get(
        "/{company_id}",
        response_model=CompanyRead,
        dependencies=[Depends(has_permission("view_companies"))]
    )
    async def get_company(
            self,
            company_id: int
    ):
        manager = CompanyManager(db=self.db)
        response = await manager.get(
            company_id,
        )
        return response

    @router.post(
        "/",
        status_code=status.HTTP_201_CREATED,
        response_model=CompanyRead,
        dependencies=[Depends(has_permission("create_companies"))]
    )
    async def create_company(
            self,
            request: CompanyCreate,
    ):
        manager = CompanyManager(db=self.db)
        response = await manager.create(
            **request.model_dump()
        )
        return response

    @router.put(
        "/{company_id}",
        status_code=status.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("update_companies"))]
    )
    async def update_company(
            self,
            company_id: int,
            request: CompanyUpdate,
    ):
        manager = CompanyManager(db=self.db)
        await manager.update(
            company_id,
            **request.model_dump()
        )

    @router.delete(
        "/{company_id}",
        status_code=status.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("delete_companies"))]
    )
    async def delete_company(
            self,
            company_id: int
    ):
        manager = CompanyManager(db=self.db)
        await manager.delete(
            company_id,
        )
