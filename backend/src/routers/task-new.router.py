from fastapi import APIRouter
from fastapi.params import Depends, Query
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.util import await_only

from dependencies import get_db, has_permission
from schemas.task import TaskRequest
from services.task_manager import TaskManager

router = APIRouter(
    prefix="/tasks",
    tags=["tasks"],
)


@cbv(router)
class TaskRouter:
    db: AsyncSession = Depends(get_db)

    @router.post(
        "/",
        summary="creating new task",
    )
    async def create_task(self, req: TaskRequest):
        manager = TaskManager(self.db)
        return await manager.create_task(req)

    @router.get(
        "/",
        summary="get all tasks",
        # dependencies=[Depends(has_permission("view_tasks"))]
    )
    async def get_tasks(
            self,
            tags: list[int] = Query(default=None),
            users: list[int] = Query(default=None)
    ):
        manager = TaskManager(self.db)
        return await manager.list_tasks(tags, users)

    @router.get(
        "/{task_id}",
        summary="get task by id"
    )
    async def get_task(self, task_id: int):
        manager = TaskManager(self.db)
        return manager.get_task(task_id)

    @router.put(
        "/{task_id}",
        summary="update task by id"
    )
    async def update_task(self, task_id: int, req: TaskRequest):
        manager = TaskManager(self.db)
        return await manager.update_task(task_id, req)


    @router.delete(
        "/{task_id}"
    )
    async def delete_task(self, task_id: int):
        manager = TaskManager(self.db)
        return await manager.delete_task(task_id)

    # task-status-patch
    # task-status-create post
    # task-status-get get all statuses
    # task-status-get-id get status by id
    # task-status-update-id update status by id
    # task-status-delete-id delete status by id
