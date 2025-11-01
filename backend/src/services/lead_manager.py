from sqlalchemy.ext.asyncio import AsyncSession

from models import Lead

from services.base_manager import BaseManager


class LeadManager(BaseManager[Lead]):
    def __init__(
            self,
            db: AsyncSession
    ):
        super().__init__(db, Lead)

