from fastapi import APIRouter, Depends
from fastapi_filter import FilterDepends
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from auth.dependencies import has_permission
from company.filters import CompanyCommentFilter
from company.managers import CompanyCommentManager
from company.schemas import CompanyCommentRead, CompanyCommentUpdate, CompanyCommentCreate
from core.dependencies import get_db

router = APIRouter(
    prefix="/{company_id}/comments",
    tags=["company"],
)


@cbv(router)
class CompanyCommentCBV:
    db: AsyncSession = Depends(get_db)

    @router.get(
        "/",
        response_model=list[CompanyCommentRead],
        dependencies=[
            Depends(has_permission("view_company_comments"))
        ]
    )
    async def get_company_comments(
            self,
            company_id: int,
            filters: CompanyCommentFilter = FilterDepends(CompanyCommentFilter),
    ):
        manager = CompanyCommentManager(
            db=self.db,
            company_id=company_id
        )
        response = await manager.list(
            filters=filters,
        )
        return response

    @router.get(
        "/{company_comment_id}",
        response_model=CompanyCommentRead,
        dependencies=[
            Depends(has_permission("view_company_comments"))
        ]
    )
    async def get_company_comment(
            self,
            company_id: int,
            company_comment_id: int
    ):
        manager = CompanyCommentManager(
            db=self.db,
            company_id=company_id
        )
        response = await manager.get(
            obj_id=company_comment_id,
        )
        return response

    @router.post(
        "/",
        status_code=status.HTTP_201_CREATED,
        response_model=CompanyCommentRead,
        dependencies=[
            Depends(has_permission("create_company_comments"))
        ]
    )
    async def create_company_comment(
            self,
            company_id: int,
            request: CompanyCommentCreate,
    ):
        manager = CompanyCommentManager(
            db=self.db,
            company_id=company_id
        )
        response = await manager.create(
            company_id=company_id,
            **request.model_dump()
        )
        return response

    @router.put(
        "/{company_comment_id}",
        status_code=status.HTTP_204_NO_CONTENT,
        dependencies=[
            Depends(has_permission("update_company_comments"))
        ]
    )
    async def update_company_comment(
            self,
            company_id: int,
            company_comment_id: int,
            request: CompanyCommentUpdate,
    ):
        manager = CompanyCommentManager(
            db=self.db,
            company_id=company_id
        )
        await manager.update(
            obj_id=company_comment_id,
            **request.model_dump()
        )

    @router.delete(
        "/{company_comment_id}",
        status_code=status.HTTP_204_NO_CONTENT,
        dependencies=[
            Depends(has_permission("delete_company_comments"))
        ]
    )
    async def delete_company_comment(
            self,
            company_id: int,
            company_comment_id: int
    ):
        manager = CompanyCommentManager(
            db=self.db,
            company_id=company_id
        )
        await manager.delete(
            obj_id=company_comment_id,
        )
