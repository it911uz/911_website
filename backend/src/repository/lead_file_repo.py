from sqlalchemy import select

from models.lead import LeadFile
from repository.base_repo import BaseRepository


class LeadFileRepository(BaseRepository[LeadFile]):
    async def list_by_lead_id(self, lead_id: int):
        result = await self.db.execute(
            select(self.model).where(
                self.model.lead_id == lead_id
            )
        )
        files = result.scalars().all()
        return files
