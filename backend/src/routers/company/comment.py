from fastapi import APIRouter, Depends
from fastapi_pagination import Page
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_db
from schemas.company import CompanyCommentRead, CompanyCommentCreate, CompanyCommentUpdate
from services.company_manager import CompanyContactManager

router = APIRouter(
    prefix="/{company_id}/comments",
    tags=["company"],
)


@cbv(router)
class CompanyCommentCBV:
    db: AsyncSession = Depends(get_db)

    @router.get(
        "/",
        response_model=Page[CompanyCommentRead]
    )
    async def get_company_comments(
            self,
            company_id: int
    ):
        pass

    @router.get(
        "/{company_comment_id}",
        response_model=CompanyCommentRead
    )
    async def get_company_comment(
            self,
            company_id: int,
            company_contact_id: int
    ):
        pass

    @router.post(
        "/",
    )
    async def create_company_comment(
            self,
            company_id: int,
            request: CompanyCommentCreate,
    ):
        pass

    @router.put(
        "/{company_comment_id}",
    )
    async def update_company_comment(
            self,
            company_id: int,
            company_contact_id: int,
            request: CompanyCommentUpdate,
    ):
        pass

    @router.delete(
        "/{company_comment_id}",
    )
    async def delete_company_comment(
            self,
            company_id: int,
            company_contact_id: int
    ):
        pass
