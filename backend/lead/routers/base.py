from fastapi import APIRouter, Depends
from fastapi_filter import FilterDepends
from fastapi_utils.cbv import cbv

from starlette import status as status_codes

from sqlalchemy.ext.asyncio import AsyncSession

from auth.dependencies import has_permission
from core.dependencies import get_db
from lead.filters import LeadFilter
from lead.managers import LeadManager
from lead.schemas import LeadCreate, LeadRead, LeadUpdate, LeadUpdateStatus, LeadMove, LeadMinRead

router = APIRouter(
    tags=["lead"],
    prefix="/leads"
)


@cbv(router)
class LeadRouter:
    db: AsyncSession = Depends(get_db)

    @router.post(
        "/",
        summary="Создание Лида",
        status_code=status_codes.HTTP_201_CREATED,
        response_model=LeadMinRead
    )
    async def create_lead(
            self,
            request: LeadCreate
    ):
        manager = LeadManager(self.db)
        response = await manager.create(**request.model_dump())
        return response

    @router.get(
        "/",
        summary="Получение Лидов",
        status_code=status_codes.HTTP_200_OK,
        response_model=list[LeadRead],
        dependencies=[Depends(has_permission("view_leads"))]

    )
    async def list_leads(
            self,
            filters: LeadFilter = FilterDepends(LeadFilter)
    ):
        manager = LeadManager(self.db)
        response = await manager.list(
            filters=filters
        )
        return response

    @router.get(
        "/{lead_id}",
        summary="Получение Лида",
        status_code=status_codes.HTTP_200_OK,
        response_model=LeadRead,
        dependencies=[Depends(has_permission("view_leads"))]
    )
    async def get_lead(
            self,
            lead_id: int
    ):
        manager = LeadManager(self.db)
        response = await manager.get(lead_id)
        return response

    @router.put(
        "/{lead_id}",
        summary="Обновление Лида",
        status_code=status_codes.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("update_leads"))]
    )
    async def update_lead(
            self,
            lead_id: int,
            request: LeadUpdate
    ):
        manager = LeadManager(self.db)
        await manager.update(lead_id, **request.model_dump())

    @router.patch(
        "/{lead_id}",
        summary="Частичное Обновление Лида",
        status_code=status_codes.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("update_leads"))]
    )
    async def update_status_lead(
            self,
            lead_id: int,
            request: LeadUpdateStatus
    ):
        manager = LeadManager(self.db)
        await manager.update(lead_id, **request.model_dump())

    @router.delete(
        "/{lead_id}",
        summary="Удаление Лида",
        status_code=status_codes.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("delete_leads"))]
    )
    async def delete_lead(
            self,
            lead_id: int
    ):
        manager = LeadManager(self.db)
        await manager.delete(lead_id)

    @router.post(
        "/move",
        status_code=status_codes.HTTP_201_CREATED,
        dependencies=[Depends(has_permission("update_leads"))]
    )
    async def lead_move(
            self,
            request: LeadMove
    ):
        manager = LeadManager(self.db)
        await manager.move_lead(request)
