import uuid

from fastapi import APIRouter, UploadFile, File, Depends
from fastapi_filter import FilterDepends
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession

from auth.dependencies import has_permission
from core.dependencies import get_db
from task.filters import TaskFileFilter
from task.manager import TaskFileManager
from task.schemas import TaskFileRead

router = APIRouter(
    prefix="/{task_id}/files",
    tags=["task"],
)


@cbv(router)
class LeadFileCBV:
    db: AsyncSession = Depends(get_db)

    @router.get(
        "/",
        response_model=list[TaskFileRead],
        dependencies=[Depends(has_permission("view_tasks"))]
    )
    async def get_lead_files(
            self,
            filters: TaskFileFilter = FilterDepends(TaskFileFilter),
    ):
        manager = TaskFileManager(db=self.db)
        response = await manager.list_files(filters=filters)
        return response

    @router.post(
        "/",
        status_code=201,
        dependencies=[Depends(has_permission("update_tasks"))]
    )
    async def upload_lead_file(
            self,
            task_id: int,
            task_file: UploadFile = File(...),
    ):
        manager = TaskFileManager(
            self.db,
        )
        await manager.upload(task_id, task_file)
        return {"status": "ok"}

    @router.delete(
        "/{task_file_id}",
        status_code=204,
        dependencies=[Depends(has_permission("update_tasks"))]
    )
    async def delete_task_file(
            self,
            task_id: int,
            task_file_id: uuid.UUID,
    ):
        manager = TaskFileManager(
            self.db,
        )
        await manager.delete_file(task_id, task_file_id)
