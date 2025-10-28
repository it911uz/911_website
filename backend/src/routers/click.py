import uuid

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.responses import RedirectResponse

from dependencies import get_db
from services.click_manager import ClickManager

router = APIRouter(
    tags=["analytics"],
    prefix="/c"
)


@router.get(
    "/{target_id}"
)
async def click_target(
        target_id: uuid.UUID,
        db: AsyncSession = Depends(get_db)
):
    manager = ClickManager(db)

    await manager.create(target_id)

    return RedirectResponse(url=f"https://it911.uz/target/?target_id={target_id}")

