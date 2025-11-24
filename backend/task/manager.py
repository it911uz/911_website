import uuid

from fastapi import UploadFile
from fastapi_filter.contrib.sqlalchemy import Filter
from sqlalchemy.ext.asyncio import AsyncSession

from core.exceptions import NotFound, Forbidden
from core.manager import BaseManager
from core.repository import ModelType
from core.services import S3Service
from tag.filters import TagFilter
from tag.repository import TagRepository
from task.models import Task
from task.repository import TaskRepository, TaskStatusRepository, TaskCommentRepository, TaskFileRepository
from task.schemas import TaskMove, TaskFileRead
from user.filters import UserFilter
from user.repository import UserRepository


class TaskManager(BaseManager):
    repo_class = TaskRepository
    fk_fields = {
        "status_id": TaskStatusRepository,
    }

    def __init__(self, db: AsyncSession):
        super().__init__(db)
        self.tag_repo = TagRepository(db=db)
        self.user_repo = UserRepository(db=db)

    async def add_tags(
            self,
            obj: Task,
            tag_ids: list[int],
            is_create: bool = False
    ):
        if not tag_ids:
            obj.tags = []
            return obj
        tags = await self.tag_repo.list(filters=TagFilter(id__in=tag_ids))
        if is_create:
            obj.tags.extend(tags)
        else:
            obj.tags = tags
        return obj

    async def add_users(
            self,
            obj: Task,
            user_ids: list[int],
            is_create: bool = False
    ):
        if not user_ids:
            obj.users = []
            return obj
        users = await self.user_repo.list(filters=UserFilter(id__in=user_ids))
        if is_create:
            obj.users.extend(users)
        else:
            obj.users = users
        return obj

    async def create(self, **kwargs):
        tag_ids = kwargs.pop('tag_ids', [])
        user_ids = kwargs.pop('user_ids', [])
        tag = await super().create(**kwargs)
        tag = await self.repo.get(tag.id)
        await self.add_tags(tag, tag_ids, True)
        await self.add_users(tag, user_ids, True)
        return tag

    async def update(self, obj_id, **kwargs):
        tag_ids = kwargs.pop('tag_ids', [])
        user_ids = kwargs.pop('user_ids', [])
        obj = await super().update(obj_id, **kwargs)
        await self.add_tags(obj, tag_ids)
        await self.add_users(obj, user_ids)

    async def move_task(self, request: TaskMove):
        task = await self.repo.get(request.task_id)
        if not task:
            raise NotFound("Task Not Found")
        task.status_id = request.status_id
        await self.repo.update(task)


class TaskStatusManager(BaseManager):
    repo_class = TaskStatusRepository
    unique_fields = ["name"]

    async def create(self, **kwargs) -> ModelType:
        max_level = await self.repo.get_max_level()
        kwargs['order'] = max_level + 1
        return await super().create(**kwargs)

    async def update(self, obj_id, **kwargs) -> ModelType:
        await self.check_unique(
            self.repo,
            kwargs,
            obj_id
        )
        obj = await self.repo.get(obj_id)
        if not obj:
            raise NotFound("Lead Status Not Found")
        for k, v in kwargs.items():
            setattr(obj, k, v)
        await self.repo.update(obj)
        return obj

    async def delete(self, obj_id) -> None:
        obj = await self.get(obj_id)

        deleted_level = obj.order

        await self.repo.delete(obj)
        await self.repo.move_deleted(deleted_level)

    async def move(self, status_id: int, new_position: int):
        """Перемещение статуса на новую позицию"""
        # Получаем статус
        status = await self.repo.get(status_id)
        if not status:
            raise NotFound("Lead Status Not Found")
        old_position = status.order
        if old_position == new_position:
            return None
        # Если двигаем вверх
        await self.repo.move_level(status_id, new_position, old_position)
        # Обновляем позицию текущего статуса
        status.order = new_position
        await self.repo.update(status)
        return None


class TaskCommentManager(BaseManager):
    repo_class = TaskCommentRepository
    fk_fields = {
        "task_id": TaskRepository,
        "user_id": UserRepository,
    }

    def __init__(self, db: AsyncSession, task_id: int):
        super().__init__(db)
        self.task_repo = TaskRepository(db=db)
        self.task_id = task_id

    async def _check_task(self, obj_id: int):
        task = await self.task_repo.get(self.task_id)
        if not task:
            raise NotFound("Task Not Found")

        comment = await self.repo.get(obj_id)

        if not comment:
            raise NotFound(f"Lead with id {obj_id} not found")

        if comment.task_id != task.id:
            raise Forbidden(f"Task Comment with id {obj_id} does not belong to this Task")

    async def get(self, obj_id, **kwargs) -> ModelType:
        await self._check_task(obj_id)
        return await super().get(obj_id)

    async def delete(self, obj_id):
        await self._check_task(obj_id)
        return await super().delete(obj_id)


class TaskFileManager(BaseManager):
    repo_class = TaskFileRepository
    fk_fields = {
        "task_id": TaskRepository,
    }

    def __init__(self, db: AsyncSession):
        super().__init__(db)
        self.task_repo = TaskRepository(db=db)
        self.s3 = S3Service()

    async def upload(
            self,
            task_id: int,
            file: UploadFile
    ):
        task = await self.task_repo.get(task_id)
        if not task:
            raise NotFound("Task Not Found")
        file_id = uuid.uuid4()
        key = f"leads/{task_id}/{file_id}-{file.filename}"
        await self.s3.upload_file(
            file,
            key
        )
        await self.repo.create(
            task_id=task_id,
            id=file_id,
            filename=file.filename,
            key=key,
        )

    async def list_files(
            self,
            filters: Filter
    ):
        files = await self.repo.list(filters)
        data = [
            TaskFileRead(
                id=file.id,
                filename=file.filename,
                url=self.s3.get_presigned_url(
                    file.key
                )
            )
            for file in files
        ]
        return data

    async def delete_file(
            self,
            task_id: int,
            file_id: uuid.UUID
    ):
        task = await self.task_repo.get(task_id)
        if not task:
            raise NotFound("Task Not Found")
        file = await self.repo.get(file_id)
        if not file:
            raise NotFound("File Not Found")

        await self.s3.delete_file(file.key)

        await self.repo.delete(file)
