from sqlalchemy import select

from models.user import User
from models.tag import Tag
from models.tasks import Task, TaskStatus
from repository.base_repo import BaseRepository


class TaskRepository(BaseRepository[Task]):
    async def add_tags(self, task: Task, tag_ids: list[int]):
        if not tag_ids:
            return
        result = await self.db.execute(select(Tag).where(Tag.id.in_(tag_ids)))
        tags = result.scalars().all()
        task.tags.extend(tags)  # ✅ безопасно вместо task.tags = ...

    async def add_users(self, task: Task, user_ids: list[int]):
        if not user_ids:
            return
        result = await self.db.execute(select(User).where(User.id.in_(user_ids)))
        users = result.scalars().all()
        task.users.extend(users)


class TaskStatusRepository(BaseRepository[TaskStatus]):
    pass
