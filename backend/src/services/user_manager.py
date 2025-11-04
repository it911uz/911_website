from sqlalchemy.ext.asyncio import AsyncSession

from models.user import User
from repository.user_repo import UserRepository
from services.base_manager import BaseManager
from services.password_service import PasswordService


class UserManager(BaseManager[User]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, User)
        self.repo = UserRepository(db, User)
        self.password_service = PasswordService()
