from sqlalchemy.ext.asyncio import AsyncSession

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

    async def delete(self, obj_id) -> None:
        obj = await self.get(obj_id)
        deleted_level = obj.level

        await self.repo.delete(obj)
        await self.repo.move_deleted(deleted_level)

    async def move(self, status_id: int, new_position: int):
        """Перемещение статуса на новую позицию"""
        # Получаем статус
        status = await self.get(status_id)
        old_position = status.order

        if old_position == new_position:
            return None

        # Если двигаем вверх
        await self.repo.move_level(old_position, new_position)

        # Обновляем позицию текущего статуса
        status.order = new_position
        await self.repo.update(status)

        return None
