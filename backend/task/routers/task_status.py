from fastapi import APIRouter, Depends
from fastapi_filter import FilterDepends
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from auth.dependencies import has_permission
from core.dependencies import get_db
from task.filters import TaskStatusFilter
from task.manager import TaskStatusManager
from task.schemas import TaskStatusMove, TaskStatusCreate, TaskStatusUpdate, TaskStatusRead

router = APIRouter(
    prefix="/task-statuses",
    tags=["tasks"]
)


@cbv(router)
class TaskCBV:
    db: AsyncSession = Depends(get_db)

    @router.get(
        "/",
        response_model=list[TaskStatusRead],
        dependencies=[Depends(has_permission("view_task_statuses"))]
    )
    async def get_task_statuses(
            self,
            filters: TaskStatusFilter = FilterDepends(TaskStatusFilter),
    ):
        manager = TaskStatusManager(db=self.db)
        response = await manager.list(filters=filters)
        return response

    @router.post(
        "/",
        status_code=status.HTTP_201_CREATED,
        response_model=TaskStatusRead,
        dependencies=[Depends(has_permission("create_task_statuses"))]
    )
    async def create_task_status(
            self,
            request: TaskStatusCreate,
    ):
        manager = TaskStatusManager(db=self.db)
        response = await manager.create(
            **request.model_dump()
        )
        return response

    @router.get(
        "/{status_id}",
        response_model=TaskStatusRead,
        dependencies=[Depends(has_permission("view_task_statuses"))]
    )
    async def get_task_status(
            self,
            status_id: int
    ):
        manager = TaskStatusManager(db=self.db)
        response = await manager.get(
            status_id
        )
        return response

    @router.put(
        "/{status_id}",
        status_code=status.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("update_task_statuses"))]
    )
    async def update_task_status(
            self,
            status_id: int,
            request: TaskStatusUpdate,
    ):
        manager = TaskStatusManager(db=self.db)
        await manager.update(
            status_id,
            **request.model_dump()
        )

    @router.delete(
        "/{status_id}",
        status_code=status.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("delete_task_statuses"))]
    )
    async def delete_task_status(
            self,
            status_id: int
    ):
        manager = TaskStatusManager(db=self.db)
        await manager.delete(
            status_id
        )

    @router.post(
        "/move",
        status_code=status.HTTP_202_ACCEPTED,
        dependencies=[Depends(has_permission("update_task_statuses"))]
    )
    async def move_task_status(
            self,
            request: TaskStatusMove,
    ):
        manager = TaskStatusManager(db=self.db)
        await manager.move(
            **request.model_dump()
        )

