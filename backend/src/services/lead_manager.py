from sqlalchemy.ext.asyncio import AsyncSession

from models.lead import Lead
from schemas.lead import LeadMove

from services.base_manager import BaseManager
from utils.cache import redis_cache

class LeadManager(BaseManager[Lead]):
    def __init__(
            self,
            db: AsyncSession
    ):
        super().__init__(db, Lead)

    async def move_lead(self, request: LeadMove):
        lead = await self.repo.get(request.lead_id)
        if not lead:
            return
        lead.status_id = request.status_id
        await self.repo.update(lead)
        await redis_cache.delete(self._cache_key(f"id:{request.lead_id}"))
        await redis_cache.delete_pattern(self._cache_key("list:*"))
