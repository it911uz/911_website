from fastapi import APIRouter, Depends
from fastapi_pagination import Page
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_db
from schemas.service import ServiceRead, ServiceCreate, ServiceUpdate


router = APIRouter(
    prefix="/services",
    tags=["service"],
)


@cbv(router)
class ServiceCBV:
    db: AsyncSession = Depends(get_db)

    @router.get(
        "/",
        response_model=Page[ServiceRead]
    )
    async def get_services(
            self,
            service_id: int
    ):
        pass

    @router.get(
        "/{service_id}",
        response_model=ServiceRead
    )
    async def get_service(
            self,
            service_id: int
    ):
        pass

    @router.post(
        "/",
    )
    async def create_service(
            self,
            service_id: int,
            request: ServiceCreate,
    ):
        pass

    @router.put(
        "/{service_id}",
    )
    async def update_service(
            self,
            service_id: int,
            request: ServiceUpdate,
    ):
        pass

    @router.delete(
        "/{service_id}",
    )
    async def delete_service(
            self,
            service_id: int,
    ):
        pass
