from sqlalchemy import select, func, update

from core.repository import BaseRepository
from tag.models import Tag

from task.models import Task, TaskStatus, TaskComment, TaskFiles


class TaskRepository(BaseRepository):
    model = Task

    async def add_tags(
            self,
            obj: Task,
            tag_ids: list[int]
    ):
        if not tag_ids:
            obj.tags.clear()
            return obj
        result = await self.db.execute(
            select(Tag).where(Tag.id.in_(tag_ids))
        )
        obj.tags = result.scalars().all()
        return obj


class TaskCommentRepository(BaseRepository):
    model = TaskComment


class TaskFileRepository(BaseRepository):
    model = TaskFiles


class TaskStatusRepository(BaseRepository):
    model = TaskStatus

    async def get_max_level(self):
        result = await self.db.execute(
            select(
                func.max(self.model.order)
            )
        )
        return result.scalar() or 0

    async def move_deleted(self, level: int):
        await self.db.execute(
            update(
                self.model
            ).where(
                self.model.order > level
            ).values(
                order=self.model.order - 1
            )
        )

    async def move_level(self, status_id: int, new_position: int, old_position: int):
        if new_position < old_position:
            await self.db.execute(
                update(self.model)
                .where(self.model.order >= new_position, self.model.order < old_position)
                .where(self.model.id != status_id)
                .values(order=self.model.order + 1)
            )
        else:
            # Двигаем вниз — сдвигаем вверх статусы между old_position + 1 и new_position
            await self.db.execute(
                update(self.model)
                .where(self.model.order <= new_position, self.model.order > old_position)
                .where(self.model.id != status_id)
                .values(order=self.model.order - 1)
            )
