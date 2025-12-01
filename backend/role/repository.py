from core.repository import BaseRepository
from role.models import Role, Permission


class RoleRepository(BaseRepository):
    model = Role

class PermissionRepository(BaseRepository):
    model = Permission