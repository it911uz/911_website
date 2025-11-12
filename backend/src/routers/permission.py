from fastapi import APIRouter, Depends
from fastapi_pagination import Page
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_db
from schemas.role import PermissionRead
from services.role_manager import PermissionManager
from utils.pagination import LargeParams

router = APIRouter(
    prefix="/permissions",
    tags=["permission"],
)


@cbv(router)
class PermissionCBV:
    db: AsyncSession = Depends(get_db)

    @router.get(
        "/",
        response_model=Page[PermissionRead],
    )
    async def get_permissions(
            self,
            params: LargeParams = Depends(),
    ):
        manager = PermissionManager(db=self.db)
        response = await manager.list(params=params)
        return response

    @router.get(
        "/{permission_id}",
        response_model=PermissionRead,
    )
    async def get_permission(
            self,
            permission_id: int,
    ):
        manager = PermissionManager(db=self.db)
        permission = await manager.get(permission_id)
        return permission
