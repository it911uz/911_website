from sqlalchemy import select, func, update

from core.repository import BaseRepository
from lead.models import Lead, LeadComment, LeadStatus, LeadFile


class LeadRepository(BaseRepository):
    model = Lead


class LeadCommentRepository(BaseRepository):
    model = LeadComment


class LeadStatusRepository(BaseRepository):
    model = LeadStatus

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

    async def move_level(self, status_id: int, new_position: int, old_position: int):
        if new_position < old_position:
            await self.db.execute(
                update(LeadStatus)
                .where(LeadStatus.level >= new_position, LeadStatus.level < old_position)
                .where(LeadStatus.id != status_id)
                .values(level=LeadStatus.level + 1)
            )
        else:
            # Двигаем вниз — сдвигаем вверх статусы между old_position + 1 и new_position
            await self.db.execute(
                update(LeadStatus)
                .where(LeadStatus.level <= new_position, LeadStatus.level > old_position)
                .where(LeadStatus.id != status_id)
                .values(level=LeadStatus.level - 1)
            )


class LeadFileRepository(BaseRepository):
    model = LeadFile
