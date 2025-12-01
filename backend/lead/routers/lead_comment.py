from fastapi import APIRouter, Depends
from fastapi_filter import FilterDepends
from fastapi_utils.cbv import cbv

from starlette import status as status_codes

from sqlalchemy.ext.asyncio import AsyncSession

from auth.dependencies import get_current_user, has_permission
from core.dependencies import get_db
from lead.filters import LeadCommentFilter
from lead.managers import LeadCommentManager
from lead.schemas import LeadCommentRead, LeadCommentCreate, LeadCommentUpdate
from user.models import User

router = APIRouter(
    tags=["lead"],
    prefix="/{lead_id}/comments",
)


@cbv(router)
class LeadCommentRouter:
    db: AsyncSession = Depends(get_db)
    user: User = Depends(get_current_user)

    @router.get(
        "/",
        status_code=status_codes.HTTP_200_OK,
        response_model=list[LeadCommentRead],
        dependencies=[Depends(has_permission("view_lead_comments"))]
    )
    async def list_lead_comments(
            self,
            lead_id: int,
            filters: LeadCommentFilter = FilterDepends(LeadCommentFilter)
    ):
        manager = LeadCommentManager(db=self.db, lead_id=lead_id)
        response = await manager.list(filters=filters)
        return response

    @router.get(
        "/{comment_id}",
        status_code=status_codes.HTTP_200_OK,
        response_model=LeadCommentRead,
        dependencies=[Depends(has_permission("view_lead_comments"))]
    )
    async def get_lead_comment(
            self,
            lead_id: int,
            comment_id: int,
    ):
        manager = LeadCommentManager(db=self.db, lead_id=lead_id)
        response = await manager.get(comment_id)
        return response

    @router.post(
        "/",
        status_code=status_codes.HTTP_201_CREATED,
        response_model=LeadCommentRead,
        dependencies=[Depends(has_permission("create_lead_comments"))]
    )
    async def create_lead_comment(
            self,
            lead_id: int,
            request: LeadCommentCreate,
    ):
        manager = LeadCommentManager(db=self.db, lead_id=lead_id)
        response = await manager.create(
            lead_id=lead_id,
            user_id=self.user.id,
            **request.model_dump()
        )
        return response

    @router.put(
        "/{comment_id}",
        status_code=status_codes.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("update_lead_comments"))]
    )
    async def update_lead_comment(
            self,
            lead_id: int,
            comment_id: int,
            request: LeadCommentUpdate,
    ):
        manager = LeadCommentManager(db=self.db, lead_id=lead_id)
        await manager.update(
            comment_id,
            lead_id=lead_id,
            user_id=self.user.id,
            **request.model_dump()
        )

    @router.delete(
        "/{comment_id}",
        status_code=status_codes.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("delete_lead_comments"))]
    )
    async def delete_lead_comment(
            self,
            lead_id: int,
            comment_id: int,
    ):
        manager = LeadCommentManager(db=self.db, lead_id=lead_id)
        await manager.delete(comment_id)
