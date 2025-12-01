from fastapi import APIRouter, Depends
from fastapi_filter import FilterDepends
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from auth.dependencies import has_permission
from core.dependencies import get_db
from service.filters import ServiceFilter
from service.manager import ServiceManager
from service.schemas import ServiceCreate, ServiceRead, ServiceUpdate

router = APIRouter(
    prefix="/services",
    tags=["service"],
)


@cbv(router)
class ServiceCBV:
    db: AsyncSession = Depends(get_db)

    @router.post(
        "/",
        status_code=status.HTTP_201_CREATED,
        response_model=ServiceRead,
        dependencies=[Depends(has_permission("create_services"))]
    )
    async def create_service(
            self,
            request: ServiceCreate
    ):
        manager = ServiceManager(self.db)
        response = await manager.create(
            **request.model_dump()
        )
        return response

    @router.get(
        "/",
        response_model=list[ServiceRead],
        dependencies=[Depends(has_permission("view_services"))]
    )
    async def get_services(
            self,
            filters: ServiceFilter = FilterDepends(ServiceFilter)
    ):
        manager = ServiceManager(self.db)
        response = await manager.list(
            filters=filters,
        )
        return response
    @router.put(
        "/{service_id}",
        status_code=status.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("update_services"))]
    )
    async def update_service(
            self,
            service_id: int,
            request: ServiceUpdate
    ):
        manager = ServiceManager(self.db)
        await manager.update(
            service_id,
            **request.model_dump()
        )

    @router.get(
        "/{service_id}",
        response_model=ServiceRead,
        dependencies=[Depends(has_permission("view_services"))]
    )
    async def get_service(
            self,
            service_id: int
    ):
        manager = ServiceManager(self.db)
        response = await manager.get(
            service_id
        )
        return response

    @router.delete(
        "/{service_id}",
        status_code=status.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("delete_services"))]
    )
    async def delete_service(
            self,
            service_id: int
    ):
        manager = ServiceManager(self.db)
        await manager.delete(
            service_id
        )
