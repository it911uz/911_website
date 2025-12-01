import uuid

from fastapi import APIRouter, UploadFile, File, Depends
from fastapi_filter import FilterDepends
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession

from auth.dependencies import has_permission
from core.dependencies import get_db
from lead.filters import LeadFileFilter
from lead.managers import LeadFileManager
from lead.schemas import LeadFileRead

router = APIRouter(
    prefix="/{lead_id}/files",
    tags=["lead"],
)


@cbv(router)
class LeadFileCBV:
    db: AsyncSession = Depends(get_db)

    @router.get(
        "/",
        response_model=list[LeadFileRead],
        dependencies=[Depends(has_permission("view_leads"))]
    )
    async def get_lead_files(
            self,
            filters: LeadFileFilter = FilterDepends(LeadFileFilter),
    ):
        manager = LeadFileManager(db=self.db)
        response = await manager.list_files(filters=filters)
        return response

    @router.post(
        "/",
        status_code=201,
        dependencies=[Depends(has_permission("update_leads"))]
    )
    async def upload_lead_file(
            self,
            lead_id: int,
            lead_file: UploadFile = File(...),
    ):
        manager = LeadFileManager(
            self.db,
        )
        await manager.upload(lead_id, lead_file)
        return {"status": "ok"}

    @router.delete(
        "/{lead_file_id}",
        status_code=204,
        dependencies=[Depends(has_permission("update_leads"))]
    )
    async def delete_lead_file(
            self,
            lead_id: int,
            lead_file_id: uuid.UUID,
    ):
        manager = LeadFileManager(
            self.db,
        )
        await manager.delete_file(lead_id, lead_file_id)
