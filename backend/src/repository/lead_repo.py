from fastapi_pagination.ext.sqlalchemy import paginate
from sqlalchemy import select, func, update

from models.lead import Lead, LeadComment, LeadStatus
from repository.base_repo import BaseRepository


class LeadRepository(BaseRepository[Lead]):
    pass


class LeadCommentRepository(BaseRepository[LeadComment]):
    async def list_comments(
            self,
            lead_id: int,
            filters=None
    ):
        stmt = select(self.model).where(LeadComment.lead_id == lead_id)

        if filters:
            stmt = filters.filter(stmt)
            stmt = filters.sort(stmt)

        return await paginate(self.db, stmt)


class LeadStatusRepository(BaseRepository[LeadStatus]):
    async def get_max_level(self):
        result = await self.db.execute(
            select(
                func.max(LeadStatus.level)
            )
        )
        return result.scalar() or 0

    async def move_deleted(self, level: int):
        await self.db.execute(
            update(
                LeadStatus
            ).where(
                LeadStatus.level > level
            ).values(
                level=LeadStatus.level - 1
            )
        )

    async def move_level(self, new_position: int, old_position: int):
        if new_position < old_position:
            await self.db.execute(
                update(LeadStatus)
                .where(LeadStatus.order >= new_position, LeadStatus.order < old_position)
                .values(order=LeadStatus.order + 1)
            )
        else:
            # Двигаем вниз — сдвигаем вверх статусы между old_position + 1 и new_position
            await self.db.execute(
                update(LeadStatus)
                .where(LeadStatus.order <= new_position, LeadStatus.order > old_position)
                .values(order=LeadStatus.order - 1)
            )
