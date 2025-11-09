from asyncpg import ForeignKeyViolationError, UniqueViolationError
from fastapi import Depends, Header
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.exc import IntegrityError, DBAPIError, DataError
from sqlalchemy.ext.asyncio import AsyncSession

from configs import BOT_SECRET
from db.session import async_session
from exceptions import Forbidden, Internal, Conflict, BadRequest
from models.user import User
from services.auth_manager import AuthManager

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")


async def get_db():
    async with async_session() as session:
        try:
            yield session
            await session.commit()
        except IntegrityError as e:
            orig = getattr(e, "orig", None)
            cause = getattr(orig, "__cause__", None)
            inner = cause or orig
            if isinstance(inner, UniqueViolationError) or "UniqueViolationError" in str(inner):
                details = "Запись с таким уникальным значением уже существует."
                raise Conflict(details)
            elif isinstance(inner, ForeignKeyViolationError) or "ForeignKeyViolationError" in str(inner):
                details = "Связанная запись не найдена (ошибка внешнего ключа)."
                raise BadRequest(details)
            else:
                details = f"Ошибка целостности данных в базе: {inner}"
                raise Internal(details)
        except DBAPIError as e:
            await session.rollback()
            print(e)
            raise BadRequest("Неверный формат данных (ошибка типа или диапазона).")
        finally:
            await session.close()


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


async def verify_bot(
        x_bot_token: str = Header(None)
):
    if x_bot_token != BOT_SECRET:
        raise Forbidden("Forbidden")


async def get_actor(
        token: str = Depends(oauth2_scheme),
        db: AsyncSession = Depends(get_db),
        x_bot_token: str = Header(None),
):
    if x_bot_token:
        await verify_bot(x_bot_token)
        return None

    if token:
        actor = await get_current_user(token, db)
        return actor
    raise Forbidden("Forbidden")
