from user.models import User
from core.repository import BaseRepository
from sqlalchemy import select


class UserRepository(BaseRepository):
    model = User

    async def get_by_username(
            self,
            username: str

    ) -> User:
        stmt = select(User).where(User.username == username)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()
