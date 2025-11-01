from sqlalchemy.ext.asyncio import AsyncSession

from exceptions import NotFound
from filters.task_filter import TaskFilter
from models.tasks import TaskStatus, Task
from repository.task_repo import TaskStatusRepository, TaskRepository
from schemas.task import TaskRequest, TaskStatusRequest, TaskStatusResponse, TaskResponse, TaskListResponse, \
    TaskStatusChangeRequest


# TODO: Теперь еще файлы и комменты нужны

class TaskStatusManager:
    def __init__(self, db):
        self.repo = TaskStatusRepository(db, TaskStatus)

    async def create_status(
            self,
            request: TaskStatusRequest,
    ):
        status = await self.repo.create(
            **request.model_dump()
        )
        return TaskStatusResponse.model_validate(status)

    async def update_status(
            self,
            status_id: int,
            request: TaskStatusRequest,
    ):
        status = await self.repo.get(status_id)
        if not status:
            raise NotFound(f"Task Status with id {status_id} not found")

        status.name = request.name
        status.is_completed = request.is_completed

        await self.repo.update(
            status
        )

    async def delete_status(
            self,
            status_id: int,
    ):
        status = await self.repo.get(status_id)
        if not status:
            raise NotFound(f"Task Status with id {status_id} not found")
        await self.repo.delete(status)

    async def get_status(
            self,
            status_id: int,
    ):
        status = await self.repo.get(status_id)
        if not status:
            raise NotFound(f"Task Status with id {status_id} not found")
        return TaskStatusResponse.model_validate(status)

    async def list_statuses(
            self
    ):
        data = await self.repo.list()
        return TaskStatusResponse.model_validate(data)


class TaskManager:
    def __init__(self, db: AsyncSession):
        self.status_repo = TaskStatusRepository(db, TaskStatus)
        self.repo = TaskRepository(db, Task)
        self.db = db

    async def create_task(
            self,
            request: TaskRequest
    ):
        status = await self.status_repo.get(
            request.status_id
        )
        if not status:
            raise NotFound(f"Task Status with id {request.status_id} not found")

        task = await self.repo.create(
            name=request.name,
            status_id=request.status_id,
            deadline=request.deadline,
            description=request.description
        )
        await self.repo.add_tags(task, request.tags)
        await self.repo.add_users(task, request.users)

        await self.db.flush()
        return TaskResponse.model_validate(task)

    async def delete_task(
            self,
            task_id: int
    ):
        task = await self.repo.get(task_id)
        if not task:
            raise NotFound(f"Task with id {task_id} not found")
        await self.repo.delete(task)

    async def update_task(
            self,
            task_id: int,
            request: TaskRequest,
    ):
        task = await self.repo.get(task_id)
        if not task:
            raise NotFound(f"Task with id {task_id} not found")
        status = await self.repo.get(
            request.status_id
        )
        if not status:
            raise NotFound(f"Task Status with id {request.status_id} not found")

        task.name = request.name
        task.status_id = request.status_id
        task.deadline = request.deadline
        task.description = request.description

        await self.repo.add_tags(task, request.tags)
        await self.repo.add_users(task, request.users)

        await self.db.flush()

    async def update_task_status(
            self,
            task_id: int,
            request: TaskStatusChangeRequest,
    ):
        task = await self.repo.get(task_id)
        if not task:
            raise NotFound(f"Task with id {task_id} not found")
        task.status_id = request.status_id
        status = await self.repo.get(
            request.status_id
        )
        if not status:
            raise NotFound(f"Task Status with id {request.status_id} not found")

        await self.repo.update(task)

    async def list_tasks(self, tags: list[int] = None, users: list[int] = None):
        filters = TaskFilter(
            tags=tags,
        )
        data = await self.repo.list(filters)
        return TaskListResponse.model_validate(data)

    async def get_task(
            self,
            task_id: int
    ):
        task = await self.repo.get(task_id)

        if not task:
            raise NotFound(f"Task with id {task_id} not found")

        return TaskResponse.model_validate(task)
