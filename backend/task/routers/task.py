from fastapi import APIRouter, Depends
from fastapi_filter import FilterDepends
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from auth.dependencies import has_permission
from core.dependencies import get_db
from task.filters import TaskFilter
from task.manager import TaskManager
from task.schemas import TaskCreate, TaskUpdate, TaskMove, TaskRead

router = APIRouter(
    prefix="/tasks",
    tags=["tasks"]
)


@cbv(router)
class TaskCBV:
    db: AsyncSession = Depends(get_db)

    @router.get(
        "/",
        response_model=list[TaskRead],
        dependencies=[Depends(has_permission("view_tasks"))]
    )
    async def get_tasks(
            self,
            filters: TaskFilter = FilterDepends(TaskFilter),
    ):
        manager = TaskManager(db=self.db)
        response = await manager.list(filters=filters)
        return response

    @router.post(
        "/",
        response_model=TaskRead,
        status_code=status.HTTP_201_CREATED,
        dependencies=[Depends(has_permission("create_tasks"))]
    )
    async def create_task(
            self,
            request: TaskCreate,
    ):
        manager = TaskManager(db=self.db)
        response = await manager.create(
            **request.model_dump()
        )
        return response

    @router.get(
        "/{task_id}",
        response_model=TaskRead,
        dependencies=[Depends(has_permission("view_tasks"))]
    )
    async def get_task(
            self,
            task_id: int
    ):
        manager = TaskManager(db=self.db)
        response = await manager.get(
            task_id
        )
        return response

    @router.put(
        "/{task_id}",
        status_code=status.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("update_tasks"))]
    )
    async def update_task(
            self,
            task_id: int,
            request: TaskUpdate,
    ):
        manager = TaskManager(db=self.db)
        await manager.update(
            task_id,
            **request.model_dump()
        )

    @router.delete(
        "/{task_id}",
        status_code=status.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("delete_tasks"))]
    )
    async def delete_task(
            self,
            task_id: int
    ):
        manager = TaskManager(db=self.db)
        await manager.delete(
            task_id
        )

    @router.post(
        "/move",
        status_code=status.HTTP_202_ACCEPTED,
        dependencies=[Depends(has_permission("update_tasks"))]
    )
    async def move_task(
            self,
            request: TaskMove,
    ):
        manager = TaskManager(db=self.db)
        await manager.move_task(
            request
        )
