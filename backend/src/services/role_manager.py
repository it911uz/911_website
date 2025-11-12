from sqlalchemy.ext.asyncio import AsyncSession

from exceptions import NotFound
from models.role import Role, Permission
from repository.permission import PermissionRepository
from schemas.role import AssignPermission
from services.base_manager import BaseManager
from utils.cache import redis_cache


class RoleManager(BaseManager[Role]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Role)
        self.permission_repo = PermissionRepository(db, Permission)

    async def assign_permissions(
            self,
            request: AssignPermission
    ):
        role: Role = await self.repo.get(request.role_id)
        if not role:
            raise NotFound(f"Role with id {request.role_id} not found")
        permissions = await self.permission_repo.list_role_permissions(
            request.permissions
        )
        if not permissions:
            raise NotFound(f"Permissions not found")

        role.permissions = permissions
        await self.db.commit()

        # Очистим кэш, чтобы обновить список
        await redis_cache.delete(self._cache_key(f"id:{role.id}"))
        await redis_cache.delete_pattern(self._cache_key("list:*"))



class PermissionManager(BaseManager[Permission]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Permission)
