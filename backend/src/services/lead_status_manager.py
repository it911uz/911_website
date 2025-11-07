from sqlalchemy.ext.asyncio import AsyncSession

from exceptions import Forbidden
from models.lead import LeadStatus
from repository.base_repo import ModelType
from repository.lead_repo import LeadStatusRepository

from services.base_manager import BaseManager


class LeadStatusManager(BaseManager[LeadStatus]):
    def __init__(
            self,
            db: AsyncSession
    ):
        super().__init__(db, LeadStatus)
        self.repo = LeadStatusRepository(db, LeadStatus)

    async def create(self, **kwargs) -> ModelType:
        max_level = await self.repo.get_max_level()
        kwargs['level'] = max_level + 1
        return await super().create(**kwargs)

    async def update(self, obj_id, **kwargs) -> ModelType:
        obj = await self.get(obj_id)
        if not obj.can_edit:
            raise Forbidden("Нельзя ")
        return await super().update(obj_id, **kwargs)

    async def delete(self, obj_id) -> None:
        obj: LeadStatus = await self.get(obj_id)
        if not obj.can_delete:
            raise Forbidden("Нельзя ")
        deleted_level = obj.level

        await self.repo.delete(obj)
        await self.repo.move_deleted(deleted_level)

    async def move(self, status_id: int, new_position: int):
        """Перемещение статуса на новую позицию"""
        # Получаем статус
        status = await self.get(status_id)
        old_position = status.level
        if old_position == new_position:
            return None

        # Если двигаем вверх
        await self.repo.move_level(status_id, new_position, old_position)

        # Обновляем позицию текущего статуса
        status.level = new_position
        await self.repo.update(status)
        return None
