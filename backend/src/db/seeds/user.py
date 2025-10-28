from db.session import async_session
from models.user import User
from repository.user_repo import UserRepository
from services.password_service import PasswordService


async def create_user():
    async with async_session() as session:
            try:
                repo = UserRepository(session, User)
                await repo.create(
                    full_name="Admin",
                    username="admin",
                    hashed_password=PasswordService().hash_password("1234"),
                    is_superuser=True
                )
                print("Пользователь создан")
            except Exception as e:
                print("Пользователь уже был создан")
