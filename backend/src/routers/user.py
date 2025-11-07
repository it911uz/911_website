from fastapi import APIRouter, Depends
from fastapi_filter import FilterDepends
from fastapi_pagination import Page, Params
from fastapi_utils.cbv import cbv

from starlette import status as status_codes

from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_db, has_permission
from filters.user_filter import UserFilter
from schemas.exceptions import ExceptionResponse
from schemas.user import UserRead, UserCreate, UserUpdate
from services.user_manager import UserManager

router = APIRouter(
    tags=["user"],
    prefix="/users",
)


@cbv(router)
class UserCBV:
    db: AsyncSession = Depends(get_db)

    @router.get(
        "/",
        summary="Получение Пользователей",
        status_code=status_codes.HTTP_200_OK,
        response_model=Page[UserRead],
        responses={
            status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
        },
        dependencies=[Depends(has_permission("view_users"))]
    )
    async def get_users(
            self,
            filters: UserFilter = FilterDepends(UserFilter),
            params: Params = Depends(),
    ):
        manager = UserManager(self.db)
        response = await manager.list(filters, params=params)
        return response


    @router.post(
        "/",
        summary="Создание Пользователя",
        status_code=status_codes.HTTP_201_CREATED,
        response_model=UserRead,
        responses={
            status_codes.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized", "model": ExceptionResponse},
            status_codes.HTTP_403_FORBIDDEN: {"description": "Forbidden", "model": ExceptionResponse},
            # 422
        },
        dependencies=[Depends(has_permission("create_users"))]
    )
    async def create_user(
            self,
            request: UserCreate

    ):
        manager = UserManager(self.db)
        response = await manager.create(**request.model_dump())
        return response


    @router.put(
        "/{user_id}",
        summary="Обновление Пользователя",
        status_code=status_codes.HTTP_204_NO_CONTENT,
        response_model=None,
        responses={
            status_codes.HTTP_204_NO_CONTENT: {"description": "Success"},
            status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
            status_codes.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized", "model": ExceptionResponse},
            status_codes.HTTP_409_CONFLICT: {"description": "Conflict", "model": ExceptionResponse},
        },
        dependencies=[Depends(has_permission("update_users"))]
    )
    async def update_user(
            self,
            user_id: int,
            request: UserUpdate
    ):
        manager = UserManager(self.db)
        await manager.update(user_id, **request.model_dump())


    @router.delete(
        "/{user_id}",
        summary="Удаление Пользователя",
        status_code=status_codes.HTTP_204_NO_CONTENT,
        response_model=None,
        responses={
            status_codes.HTTP_204_NO_CONTENT: {"description": "Success"},
            status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
            status_codes.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized", "model": ExceptionResponse},
            status_codes.HTTP_409_CONFLICT: {"description": "Conflict", "model": ExceptionResponse},
        },
        dependencies=[Depends(has_permission("delete_users"))]
    )
    async def delete_user(
            self,
            user_id: int,
    ):
        manager = UserManager(self.db)
        await manager.delete(user_id)


    @router.get(
        "/{user_id}",
        summary="Получение Пользователя",
        status_code=status_codes.HTTP_200_OK,
        response_model=None,
        responses={
            status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
            status_codes.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized", "model": ExceptionResponse},
            status_codes.HTTP_409_CONFLICT: {"description": "Conflict", "model": ExceptionResponse},
        },
        dependencies=[Depends(has_permission("view_users"))]
    )
    async def get_user(
            self,
            user_id: int,
    ):
        manager = UserManager(self.db)
        response = await manager.get(user_id)
        return response
