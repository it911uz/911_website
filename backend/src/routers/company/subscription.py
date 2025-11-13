from fastapi import APIRouter, Depends
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_db

router = APIRouter(
    tags=["Company"],
    prefix="/companies"
)


@cbv(router)
class CompanyCBV:
    db: AsyncSession = Depends(get_db)

    async def create_company(
            self,
            request
    ):
        pass