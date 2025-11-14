from fastapi import APIRouter
from fastapi.params import Depends
from fastapi_pagination import Page
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi_utils.cbv import cbv

from dependencies import get_db, has_permission
from schemas.task import TaskStatusRequest, TaskStatusResponse
from services.task_manager import TaskStatusManager

router = APIRouter(
    tags=["tasks"],
    prefix="/task-statuses"
)


@cbv(router)
class TaskStatusCBV:
    db: AsyncSession = Depends(get_db)

    @router.get(
        "/",
        response_model=Page[TaskStatusResponse],
        dependencies=[Depends(has_permission("view_task_statuses"))]
    )
    async def get_task_statuses(
            self,
    ):
        manager = TaskStatusManager(db=self.db)
        response = await manager.list()
        return response

    @router.get(
        "/{status_id}",
        dependencies=[Depends(has_permission("view_task_statuses"))]
    )
    async def get_status(
            self,
            status_id: int,
            db: AsyncSession = Depends(get_db)
    ):
        manager = TaskStatusManager(db)
        response = await manager.get_status(status_id)
        return response

    @router.put(
        "/{status_id}",
        dependencies=[Depends(has_permission("update_task_statuses"))]
    )
    async def update_status(
            self,
            status_id: int,
            request: TaskStatusRequest,
    ):
        manager = TaskStatusManager(self.db)
        await manager.update_status(status_id, request)

    @router.delete(
        "/{status_id}",
        dependencies=[Depends(has_permission("delete_task_statuses"))]
    )
    async def delete_status(
            self,
            status_id: int,
            db: AsyncSession = Depends(get_db)
    ):
        manager = TaskStatusManager(db)
        await manager.delete_status(status_id)

    @router.post(
        "/",
        dependencies=[Depends(has_permission("create_task_statuses"))]
    )
    async def create_status(
            self,
            request: TaskStatusRequest,
            # user: User = Depends(get_current_user),
    ):
        manager = TaskStatusManager(self.db)
        return await manager.create_status(request)
