import uuid

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.responses import RedirectResponse

from clicks.manager import ClickManager
from core.dependencies import get_db

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
    data = {"target_id": target_id}
    await manager.create(
        **data
    )
    return RedirectResponse(url=f"https://it911.uz/target/?target_id={target_id}")
