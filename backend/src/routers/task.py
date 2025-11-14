from fastapi import APIRouter, Depends, Query
from fastapi_filter import FilterDepends
from fastapi_filter import FilterDepends
from fastapi_pagination import Page, Params
from sqlalchemy.ext.asyncio import AsyncSession

from filters.task_filter import TaskFilter
from dependencies import get_current_user, get_db
# from models.user import User
from schemas.task import TaskMove, TaskRequest, TaskResponse, TaskStatusRequest, TaskStatusChangeRequest
from services.task_manager import TaskStatusManager, TaskManager
from fastapi_utils.cbv import cbv


router = APIRouter(
    prefix="/tasks",
    tags=["tasks"],
)


@cbv(router)
class TaskRouterCBV:
    db: AsyncSession = Depends(get_db)

    @router.post(
        "/",
        response_model=TaskResponse
    )
    async def create_task(
        self,
        request: TaskRequest,
        # user: User = Depends(get_current_user),
    ):
        manager = TaskManager(self.db)
        response = await manager.create_task(request)
        return response


    @router.get(  
        "/",
        response_model = Page[TaskResponse]
    )
    async def get_tasks(
        self,
        filters: TaskFilter = FilterDepends(TaskFilter),
    ):
        manager = TaskManager(db=self.db)
        response = await manager.list(filters=filters)
        return response



    @router.get(
        "/{task_id}",
        response_model=TaskResponse
    )
    async def get_task(
        self,
        task_id: int,
    ):
        manager = TaskManager(self.db)
        response = await manager.get(task_id)
        return response


    @router.put(
        "/{task_id}",
        response_model=None
    )
    async def update_task(
        self,
        task_id: int,
        request: TaskRequest,
    ):
        manager = TaskManager(self.db)
        await manager.update_task(task_id, request)


    @router.patch(
        "/{task_id}/status/",
        response_model=None
    )
    async def update_task_status(
        self,
        task_id: int,
        request: TaskStatusChangeRequest,
    ):
        manager = TaskManager(self.db)
        await manager.update_task_status(task_id, request)


    @router.delete(
        "/{task_id}",
        response_model=None
    )
    async def delete_task(
        self,
        task_id: int,
    ):
        manager = TaskManager(self.db)
        await manager.delete(task_id)

    @router.post(
        "/move"
    )
    async def move_task(
        self,
        request: TaskMove
    ):
        manager = TaskManager(self.db)
        await manager.move_task(request)