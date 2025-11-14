from fastapi import APIRouter, Depends
from fastapi_filter import FilterDepends
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from dependencies import get_db, has_permission
from filters.company_filter import CompanyContactFilter
from models.company import CompanyContact
from schemas.company import CompanyContactRead, CompanyContactCreate, CompanyContactUpdate
from services.company_manager import CompanyContactManager

router = APIRouter(
    prefix="/{company_id}/contacts",
    tags=["company"],
)


@cbv(router)
class CompanyContactCBV:
    db: AsyncSession = Depends(get_db)

    @router.get(
        "/",
        response_model=list[CompanyContactRead],
        dependencies=[Depends(has_permission("view_company_contacts"))],
    )
    async def get_company_contacts(
            self,
            company_id: int,
            filters: CompanyContactFilter = FilterDepends(CompanyContactFilter),
    ):
        manager = await CompanyContactManager.build(
            db=self.db,
            company_id=company_id,
            model=CompanyContact
        )
        response = await manager.list_all(filters=filters)
        return response

    @router.get(
        "/{company_contact_id}",
        response_model=CompanyContactRead,
        dependencies=[Depends(has_permission("view_company_contacts"))],
    )
    async def get_company_contact(
            self,
            company_id: int,
            company_contact_id: int
    ):
        manager = await CompanyContactManager.build(
            db=self.db,
            company_id=company_id,
            model=CompanyContact
        )
        response = await manager.get(company_contact_id)
        return response

    @router.post(
        "/",
        status_code=status.HTTP_201_CREATED,
        response_model=CompanyContactRead,
        dependencies=[Depends(has_permission("create_company_contacts"))],
    )
    async def create_company_contact(
            self,
            company_id: int,
            request: CompanyContactCreate,
    ):
        manager = await CompanyContactManager.build(
            db=self.db,
            company_id=company_id,
            model=CompanyContact
        )
        response = await manager.create(
            company_id=company_id,
            **request.model_dump()
        )
        return response

    @router.put(
        "/{company_contact_id}",
        status_code=status.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("update_company_contacts"))],
    )
    async def update_company_contact(
            self,
            company_id: int,
            company_contact_id: int,
            request: CompanyContactUpdate,
    ):
        manager = await CompanyContactManager.build(
            db=self.db,
            company_id=company_id,
            model=CompanyContact
        )
        await manager.update(
            obj_id=company_contact_id,
            **request.model_dump()
        )

    @router.delete(
        "/{company_contact_id}",
        status_code=status.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("delete_company_contacts"))],
    )
    async def delete_company_contact(
            self,
            company_id: int,
            company_contact_id: int
    ):
        manager = await CompanyContactManager.build(
            db=self.db,
            company_id=company_id,
            model=CompanyContact
        )
        await manager.delete(company_contact_id)
