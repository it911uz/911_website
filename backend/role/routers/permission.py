from fastapi import APIRouter, Depends
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession

from core.dependencies import get_db
from role.managers import PermissionManager
from role.schemas import PermissionRead

router = APIRouter(
    prefix="/permissions",
    tags=["permission"],
)


@cbv(router)
class PermissionCBV:
    db: AsyncSession = Depends(get_db)

    @router.get(
        "/",
        response_model=list[PermissionRead],
    )
    async def get_permissions(
            self,
    ):
        manager = PermissionManager(db=self.db)
        response = await manager.list()

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
