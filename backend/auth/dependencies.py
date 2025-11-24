from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession

from auth.manager import AuthManager
from core.dependencies import get_db
from core.exceptions import Forbidden
from user.models import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")


async def get_current_user(
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(get_db),
):
    manager = AuthManager(db)
    return await manager.get_me(token)


def has_permission(permission: str):
    async def permission_checker(user: User = Depends(get_current_user)):
        if user.is_superuser:
            return None

        # например, асинхронный доступ к БД
        for perm in user.role.permissions:
            if perm.codename == permission:
                return None

        raise Forbidden("Permission Denied")

    return permission_checker
