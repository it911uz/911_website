from fastapi import APIRouter, Depends

from fastapi_pagination import Page

from fastapi_utils.cbv import cbv

from starlette import status as status_codes

from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_db, get_current_user

from models.user import User

from schemas.lead import LeadStatusCreate, LeadStatusUpdate, LeadStatusRead, LeadStatusMove

from services.lead_status_manager import LeadStatusManager

router = APIRouter(
    tags=["lead"],
    prefix="/lead-statuses"
)


@cbv(router)
class LeadStatusCBV:
    db: AsyncSession = Depends(get_db)

    @router.get(
        "/",
        response_model=Page[LeadStatusRead],
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
    )
    async def update_lead_status(
            self,
            status_id: int,
            request: LeadStatusUpdate,
    ):
        manager = LeadStatusManager(db=self.db)
        await manager.update(status_id=status_id, **request.model_dump())

    @router.get(
        "/{status_id}"
    )
    async def get_lead_status(
            self,
            status_id: int,
    ):
        manager = LeadStatusManager(db=self.db)
        response = await manager.get(status_id)
        return response

    @router.delete(
        "/{status_id}"
    )
    async def delete_lead_status(
            self,
            status_id: int,
    ):
        manager = LeadStatusManager(db=self.db)
        await manager.delete(status_id)
