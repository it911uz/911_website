from models.user import User
from repository.base_repo import BaseRepository
from sqlalchemy import select


class UserRepository(BaseRepository[User]):

    async def get_by_username(
            self,
            username: str

    ) -> User:
        stmt = select(User).where(User.username == username)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

