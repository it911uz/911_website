from sqlalchemy.ext.asyncio import AsyncSession

from models import Role
from services.base_manager import BaseManager


class RoleManager(BaseManager[Role]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Role)
