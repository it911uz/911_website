from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_current_user, get_db
# from models.user import User
from schemas.task import TaskMove, TaskRequest, TaskStatusRequest, TaskStatusChangeRequest
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
            
        "/"
    )
    async def get_tasks(
        self,
            tags: list[int] = Query(default=None),
            users: list[int] = Query(default=None),
    ):
        manager = TaskManager(self.db)
        response = await manager.list_tasks(tags, users)
        return response


    @router.get(
        "/{task_id}"
    )
    async def get_task(
        self,
        task_id: int,
    ):
        manager = TaskManager(self.db)
        response = await manager.get_task(task_id)
        return response


    @router.put(
        "/{task_id}"
    )
    async def update_task(
        self,
        task_id: int,
        request: TaskRequest,
    ):
        manager = TaskManager(self.db)
        await manager.update_task(task_id, request)


    @router.patch(
        "/{task_id}/status/"
    )
    async def update_task_status(
        self,
            task_id: int,
            request: TaskStatusChangeRequest,
    ):
        manager = TaskManager(self.db)
        await manager.update_task_status(task_id, request)


    @router.delete(
        "/{task_id}"
    )
    async def delete_task(
        self,
        task_id: int,
    ):
        manager = TaskManager(self.db)
        await manager.delete_task(task_id)

    @router.post(
        "/move"
    )
    async def move_task(
        self,
        request: TaskMove
    ):
        manager = TaskManager(self.db)
        await manager.move_task(request)