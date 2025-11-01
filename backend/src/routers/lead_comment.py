from fastapi import APIRouter, Depends
from fastapi_filter import FilterDepends
from fastapi_pagination import Page
from fastapi_utils.cbv import cbv

from starlette import status as status_codes

from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_db, get_current_user
from filters.lead_filter import LeadCommentFilter

from models.user import User

from schemas.lead import LeadCommentRead, LeadCommentCreate, LeadCommentUpdate
from services.lead_comment_manager import LeadCommentManager


router = APIRouter(
    tags=["lead"],
    prefix="/leads/{lead_id}/comments",
)


@cbv(router)
class LeadCommentRouter:
    db: AsyncSession = Depends(get_db)
    user: User = Depends(get_current_user)

    @router.get(
        "/",
        status_code=status_codes.HTTP_200_OK,
        response_model=Page[LeadCommentRead],
    )
    async def list_lead_comments(
            self,
            lead_id: int,
            filters: LeadCommentFilter = FilterDepends(LeadCommentFilter),
    ):
        manager = LeadCommentManager(db=self.db)
        response = await manager.get_lead_comments(lead_id=lead_id, filters=filters)
        return response

    @router.get(
        "/{comment_id}",
        status_code=status_codes.HTTP_200_OK,
        response_model=LeadCommentRead,
    )
    async def get_lead_comment(
            self,
            lead_id: int,
            comment_id: int,
    ):
        manager = LeadCommentManager(db=self.db)
        response = await manager.get_comment(lead_id, comment_id)
        return response

    @router.post(
        "/",
        status_code=status_codes.HTTP_201_CREATED,
        response_model=LeadCommentRead,
    )
    async def create_lead_comment(
            self,
            lead_id: int,
            request: LeadCommentCreate,
    ):
        manager = LeadCommentManager(db=self.db)
        response = await manager.create(
            lead_id=lead_id,
            **request.model_dump()
        )
        return response

    @router.put(
        "/{comment_id}",
        status_code=status_codes.HTTP_204_NO_CONTENT,
    )
    async def update_lead_comment(
            self,
            lead_id: int,
            comment_id: int,
            request: LeadCommentUpdate,
    ):
        manager = LeadCommentManager(db=self.db)
        await manager.update(
            lead_comment_id=comment_id,
            lead_id=lead_id,
            **request.model_dump()
        )

    @router.delete(
        "/{comment_id}",
        status_code=status_codes.HTTP_204_NO_CONTENT,
    )
    async def delete_lead_comment(
            self,
            lead_id: int,
            comment_id: int,
    ):
        manager = LeadCommentManager(db=self.db)
        await manager.delete_comment(lead_id, comment_id)
