from fastapi import APIRouter, Depends

from fastapi_pagination import Params

from fastapi_utils.cbv import cbv

from starlette import status as status_codes

from sqlalchemy.ext.asyncio import AsyncSession

from auth.dependencies import has_permission
from core.dependencies import get_db
from lead.managers import LeadStatusManager
from lead.schemas import LeadStatusRead, LeadStatusMove, LeadStatusCreate, LeadStatusUpdate

router = APIRouter(
    tags=["lead"],
    prefix="/lead-statuses"
)


@cbv(router)
class LeadStatusCBV:
    db: AsyncSession = Depends(get_db)
    @router.get(
        "/",
        response_model=list[LeadStatusRead],
        dependencies=[Depends(has_permission("view_lead_statuses"))]
    )
    async def get_lead_statuses(
            self,
    ):
        manager = LeadStatusManager(db=self.db)
        response = await manager.list()
        return response

    @router.post(
        "/move",
        status_code=status_codes.HTTP_201_CREATED,
        dependencies=[Depends(has_permission("update_lead_statuses"))]
    )
    async def move_status(
            self,
            request: LeadStatusMove
    ):
        manager = LeadStatusManager(db=self.db)
        await manager.move(**request.model_dump())

    @router.post(
        "/",
        response_model=LeadStatusRead,
        dependencies=[Depends(has_permission("create_lead_statuses"))]
    )
    async def create_lead_status(
            self,
            request: LeadStatusCreate,
    ):
        manager = LeadStatusManager(db=self.db)
        response = await manager.create(**request.model_dump())
        return response

    @router.put(
        "/{status_id}",
        status_code=status_codes.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("update_lead_statuses"))]
    )
    async def update_lead_status(
            self,
            status_id: int,
            request: LeadStatusUpdate,
    ):
        manager = LeadStatusManager(db=self.db)
        await manager.update(status_id, **request.model_dump())

    @router.get(
        "/{status_id}",
        response_model=LeadStatusRead,
        dependencies=[Depends(has_permission("view_lead_statuses"))]
    )
    async def get_lead_status(
            self,
            status_id: int,
    ):
        manager = LeadStatusManager(db=self.db)
        response = await manager.get(status_id)
        return response

    @router.delete(
        "/{status_id}",
        status_code=status_codes.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("delete_lead_statuses"))]
    )
    async def delete_lead_status(
            self,
            status_id: int,
    ):
        manager = LeadStatusManager(db=self.db)
        await manager.delete(status_id)
