from sqlalchemy import select

from models.role import Permission
from repository.base_repo import BaseRepository


class PermissionRepository(BaseRepository[Permission]):
    async def list_role_permissions(self, permissions: list[int]):
        result = await self.db.execute(
            select(Permission).where(
                Permission.id.in_(permissions)
            )
        )
        return result.scalars().all()
