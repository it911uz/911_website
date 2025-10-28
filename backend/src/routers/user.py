from fastapi import APIRouter, Depends, Query

from starlette import status as status_codes

from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_superuser, get_db, get_current_user
from models.user import User
from schemas.base import Sort
from schemas.exceptions import ExceptionResponse
from schemas.user import UserListResponse, UserResponse, UserCreateRequest, UserRequest
from services.user_manager import UserManager

router = APIRouter(
    tags=["user"],
    prefix="/users",
)


@router.get(
    "/",
    summary="Получение Пользователей",
    status_code=status_codes.HTTP_200_OK,
    response_model=UserListResponse,
    responses={
        status_codes.HTTP_200_OK: {"description": "Success", "model": UserListResponse},
        status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
    }
)
async def get_users(
        is_superuser: bool = Query(default=None, ),
        fullname: str = Query(None, alias="q"),
        sort_by: list[Sort] = Query(default=None, description="Сортировка"),
        page: int = Query(default=1, ge=1, description="Страница"),
        size: int = Query(default=1, ge=1, description="Размер Страницы"),
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = UserManager(db, user)
    response = await manager.get_users(
        is_superuser=is_superuser,
        full_name=fullname,
        sorts=sort_by,
        page=page,
        size=size,
    )
    return response


@router.post(
    "/",
    summary="Создание Пользователя",
    status_code=status_codes.HTTP_201_CREATED,
    response_model=UserResponse,
    responses={
        status_codes.HTTP_201_CREATED: {"description": "Success", "model": UserResponse},
        status_codes.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized", "model": ExceptionResponse},
        status_codes.HTTP_403_FORBIDDEN: {"description": "Forbidden", "model": ExceptionResponse},
        # 422
    }
)
async def create_user(
        request: UserCreateRequest,
        user: User = Depends(get_superuser),
        db: AsyncSession = Depends(get_db)
):
    manager = UserManager(db, user)
    response = await manager.create_user(request)
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
    }
)
async def update_user(
        user_id: int,
        request: UserRequest,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = UserManager(db, user)
    await manager.update_user(user_id, request)


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
    }
)
async def delete_user(
        user_id: int,
        user: User = Depends(get_superuser),
        db: AsyncSession = Depends(get_db)
):
    manager = UserManager(db, user)
    await manager.delete_user(user_id)


@router.get(
    "/{user_id}",
    summary="Получение Пользователя",
    status_code=status_codes.HTTP_200_OK,
    response_model=None,
    responses={
        status_codes.HTTP_200_OK: {"description": "Success", "model": UserResponse},
        status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
        status_codes.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized", "model": ExceptionResponse},
        status_codes.HTTP_409_CONFLICT: {"description": "Conflict", "model": ExceptionResponse},
    }
)
async def get_user(
        user_id: int,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = UserManager(db, user)
    response = await manager.get_user(user_id)
    return response
