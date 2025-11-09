from uuid import UUID
from fastapi import APIRouter, UploadFile, File

router = APIRouter(
    prefix="/leads/{lead_id}/files",
    tags=["lead"],
)


@router.get(
    "/",
)
async def get_lead_files(
        lead_id: int,
):
    pass


@router.post(
    "/",
)
async def upload_lead_file(
        lead_id: int,
        lead_file: UploadFile = File(...),
):
    pass


@router.get(
    "/{lead_file_id}",
)
async def get_lead_file(
        lead_file_id: UUID,
):
    pass
