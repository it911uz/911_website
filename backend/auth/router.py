from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession

from starlette import status

from auth.manager import AuthManager
from auth.schemas import Token, RefreshToken, ChangePasswordSchema
from auth.dependencies import get_current_user
from core.dependencies import get_db
from user.models import User
from user.schemas import UserRead

router = APIRouter(
    tags=["auth"],
    prefix="/auth",
)


@cbv(router)
class AuthCBV:
    db: AsyncSession = Depends(get_db)

    @router.post(
        "/token",
        summary="Авторизация",
        response_model=Token,
        status_code=status.HTTP_201_CREATED
    )
    async def login(
            self,
            form_data: OAuth2PasswordRequestForm = Depends(),

    ):
        manager = AuthManager(self.db)
        token = await manager.login(form_data.username, form_data.password)
        return token


    @router.post(
        "/refresh",
        summary="Обновление Токена",
        response_model=Token,
        status_code=status.HTTP_201_CREATED
    )
    async def refresh(
            self,
            token: RefreshToken
    ):
        manager = AuthManager(self.db)
        token = await manager.refresh_token(token.refresh_token)
        return token


    @router.get(
        "/me",
        summary="Получение Текущей Информации Пользователя",
        response_model=UserRead,
        status_code=status.HTTP_200_OK
    )
    async def me(
            self,
            user: User = Depends(get_current_user)
    ):
        return user


    @router.post(
        "/change-password",
        summary="Обновление Пароля",
        status_code=status.HTTP_204_NO_CONTENT,
        response_model=None
    )
    async def change_password(
            self,
            request: ChangePasswordSchema,
            user: User = Depends(get_current_user)
    ):
        manager = AuthManager(self.db)
        await manager.change_password(user, request.old_password, request.new_password)
