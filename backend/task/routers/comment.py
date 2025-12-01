from fastapi import APIRouter, Depends
from fastapi_filter import FilterDepends
from fastapi_utils.cbv import cbv

from starlette import status as status_codes

from sqlalchemy.ext.asyncio import AsyncSession

from auth.dependencies import get_current_user, has_permission
from core.dependencies import get_db
from task.filters import TaskCommentFilter
from task.manager import TaskCommentManager
from task.schemas import TaskCommentRead, TaskCommentCreate

from user.models import User

router = APIRouter(
    tags=["task"],
    prefix="/{task_id}/comments",
)


@cbv(router)
class TaskCommentRouter:
    db: AsyncSession = Depends(get_db)
    user: User = Depends(get_current_user)

    @router.get(
        "/",
        status_code=status_codes.HTTP_200_OK,
        response_model=list[TaskCommentRead],
        dependencies=[Depends(has_permission("view_task_comments"))]
    )
    async def list_task_comments(
            self,
            task_id: int,
            filters: TaskCommentFilter = FilterDepends(TaskCommentFilter)
    ):
        manager = TaskCommentManager(db=self.db, task_id=task_id)
        response = await manager.list(filters=filters)
        return response

    @router.get(
        "/{comment_id}",
        status_code=status_codes.HTTP_200_OK,
        response_model=TaskCommentRead,
        dependencies=[Depends(has_permission("view_task_comments"))]
    )
    async def get_task_comment(
            self,
            task_id: int,
            comment_id: int,
    ):
        manager = TaskCommentManager(db=self.db, task_id=task_id)
        response = await manager.get(comment_id)
        return response

    @router.post(
        "/",
        status_code=status_codes.HTTP_201_CREATED,
        response_model=TaskCommentRead,
        dependencies=[Depends(has_permission("create_lead_comments"))]
    )
    async def create_task_comment(
            self,
            task_id: int,
            request: TaskCommentCreate,
    ):
        manager = TaskCommentManager(db=self.db, task_id=task_id)
        response = await manager.create(
            task_id=task_id,
            user_id=self.user.id,
            **request.model_dump()
        )
        return response


    @router.delete(
        "/{comment_id}",
        status_code=status_codes.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("delete_task_comments"))]
    )
    async def delete_lead_comment(
            self,
            task_id: int,
            comment_id: int,
    ):
        manager = TaskCommentManager(db=self.db, task_id=task_id)
        await manager.delete(comment_id)
