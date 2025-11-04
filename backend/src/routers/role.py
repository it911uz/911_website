from fastapi import APIRouter, Depends, Query
from fastapi_filter import FilterDepends
from fastapi_pagination import paginate, Page
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_current_user, get_db
from filters.role_filter import RoleFilter

from services.role_manager import RoleManager

from schemas.role import RoleRead, RoleCreate, RoleUpdate

router = APIRouter(
    prefix="/roles",
    tags=["roles"],
)


@cbv(router)
class RoleCBV:
    db: AsyncSession = Depends(get_db)

    @router.get(
        "/",
        response_model=Page[RoleRead]
    )
    async def list_roles(
            self,
            filters: RoleFilter = FilterDepends(RoleFilter)
    ):
        manager = RoleManager(db=self.db)
        response = await manager.list(filters)
        return response

    @router.post(
        "/",
        response_model=RoleRead,
        status_code=201,
    )
    async def create_role(
            self,
            request: RoleCreate
    ):
        manager = RoleManager(db=self.db)
        response = await manager.create(
            **request.model_dump()
        )
        return response

    @router.put(
        "/{role_id}",
        status_code=204
    )
    async def update_role(
            self,
            request: RoleUpdate,
    ):
        manager = RoleManager(db=self.db)
        response = await manager.update(
            **request.model_dump()
        )
        return response

    @router.delete(
        "/{role_id}",
        status_code=204
    )
    async def delete_role(
            self,
            role_id: int
    ):
        manager = RoleManager(db=self.db)
        response = await manager.delete(
            role_id
        )
        return response

    @router.get(
        "/{role_id}",
        status_code=200,
        response_model=RoleRead,
    )
    async def read_role(
            self,
            role_id: int
    ):
        manager = RoleManager(db=self.db)
        response = await manager.get(
            role_id
        )
        return response