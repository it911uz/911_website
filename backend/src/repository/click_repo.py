import uuid

from sqlalchemy import select

from models.click import Click
from repository.base_repo import BaseRepository


class ClickRepository(BaseRepository[Click]):
    async def get_clicks(self, target_id: uuid.UUID):
        result = await self.db.execute(
            select(Click).where(Click.target_id == target_id)
        )
        return result.scalars().all()