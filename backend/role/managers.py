from sqlalchemy.ext.asyncio import AsyncSession

from core.exceptions import NotFound
from core.manager import BaseManager

from role.filters import PermissionFilter
from role.models import Role
from role.repository import PermissionRepository, RoleRepository
from role.schemas import AssignPermission


class RoleManager(BaseManager):
    repo_class = RoleRepository
    unique_fields = ["name"]

    def __init__(self, db: AsyncSession):
        super().__init__(db)
        self.permission_repo = PermissionRepository(db)

    async def assign_permissions(
            self,
            request: AssignPermission
    ):
        role: Role = await self.repo.get(request.role_id)
        if not role:
            raise NotFound(f"Role with id {request.role_id} not found")
        filters = PermissionFilter(
            id__in=request.permissions
        )
        permissions = await self.permission_repo.list(
            filters=filters
        )

        if not permissions:
            raise NotFound(f"Permissions not found")

        role.permissions = permissions
        await self.db.commit()


class PermissionManager(BaseManager):
    repo_class = PermissionRepository

    def __init__(self, db: AsyncSession):
        super().__init__(db)
