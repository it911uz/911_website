from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_current_user, get_db
# from models.user import User
from schemas.task import TaskRequest, TaskStatusRequest, TaskStatusChangeRequest
from services.task_manager import TaskStatusManager, TaskManager

router = APIRouter(
    prefix="/tasks",
    tags=["tasks"],
)


@router.post(
    "/"
)
async def create_task(
        request: TaskRequest,
        # user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = TaskManager(db)
    response = await manager.create_task(request)
    return response


@router.get(
    "/"
)
async def get_tasks(
        tags: list[int] = Query(default=None),
        users: list[int] = Query(default=None),
        db: AsyncSession = Depends(get_db)
):
    manager = TaskManager(db)
    response = await manager.list_tasks(tags, users)
    return response


@router.get(
    "/task_id"
)
async def get_task(
        task_id: int,
        db: AsyncSession = Depends(get_db)
):
    manager = TaskManager(db)
    response = await manager.get_task(task_id)
    return response


@router.put(
    "/{task_id}"
)
async def update_task(
        task_id: int,
        request: TaskRequest,
        db: AsyncSession = Depends(get_db)
):
    manager = TaskManager(db)
    await manager.update_task(task_id, request)


@router.patch(
    "/{task_id}/status/"
)
async def update_task_status(
        task_id: int,
        request: TaskStatusChangeRequest,
        db: AsyncSession = Depends(get_db)
):
    manager = TaskManager(db)
    await manager.update_task_status(task_id, request)


@router.delete(
    "/{task_id}"
)
async def delete_task(
        task_id: int,
        db: AsyncSession = Depends(get_db)
):
    manager = TaskManager(db)
    await manager.delete_task(task_id)


@router.post(
    "/status/"
)
async def create_status(
        request: TaskStatusRequest,
        # user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = TaskStatusManager(db)
    return await manager.create_status(request)


@router.get(
    "/status"
)
async def get_statuses(
        db: AsyncSession = Depends(get_db)
):
    manager = TaskStatusManager(db)
    response = await manager.list_statuses()
    return response


@router.get(
    "/status/{status_id}"
)
async def get_status(
        status_id: int,
        db: AsyncSession = Depends(get_db)
):
    manager = TaskStatusManager(db)
    response = await manager.get_status(status_id)
    return response


@router.put(
    "/status/{status_id}"
)
async def update_status(
        status_id: int,
        request: TaskStatusRequest,
        db: AsyncSession = Depends(get_db)
):
    manager = TaskStatusManager(db)
    await manager.update_status(status_id, request)


@router.delete(
    "/status/{status_id}"
)
async def delete_status(
        status_id: int,
        db: AsyncSession = Depends(get_db)
):
    manager = TaskStatusManager(db)
    await manager.delete_status(status_id)
