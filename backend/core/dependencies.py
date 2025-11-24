from asyncpg import UniqueViolationError, ForeignKeyViolationError

from sqlalchemy.exc import IntegrityError, DBAPIError


from core.exceptions import Conflict, BadRequest, Internal
from core.session import async_session


async def get_db():
    async with async_session() as session:
        try:
            yield session
            await session.commit()
        except IntegrityError as e:
            print(e)
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
                print(e)
                raise Internal(details)
        except DBAPIError as e:
            print(e)
            await session.rollback()
            raise BadRequest("Неверный формат данных (ошибка типа или диапазона).")
        finally:
            await session.close()



