from sqlalchemy.ext.asyncio import AsyncSession

from auth.services import PasswordService
from core.manager import BaseManager
from core.repository import ModelType
from role.repository import RoleRepository
from user.repository import UserRepository


class UserManager(BaseManager):
    repo_class = UserRepository
    fk_fields = {
        "role_id": RoleRepository
    }
    unique_fields = ["username"]

    def __init__(self, db: AsyncSession):
        super().__init__(db)
        self.password_service = PasswordService()

    async def create(self, **kwargs) -> ModelType:
        password = kwargs.pop("password")
        hashed_password = self.password_service.hash_password(password)
        return await super().create(**kwargs, hashed_password=hashed_password)
