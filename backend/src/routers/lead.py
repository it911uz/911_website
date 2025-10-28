import uuid
from datetime import datetime

from fastapi import APIRouter, Depends, Query, Path

from starlette import status as status_codes

from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_db, get_current_user

from models.lead import StatusEnum
from models.user import User

from schemas.base import Sort
from schemas.exceptions import ExceptionResponse
from schemas.lead import LeadRequest, ChangeStatusRequest, LeadCommentRequest, LeadResponse, ListLeadResponse, \
    ListLeadCommentResponse, LeadCommentResponse

from services.lead_manager import LeadManager

router = APIRouter(
    tags=["lead"],
    prefix="/leads"
)


@router.post(
    "/",
    summary="Создание Лида",
    status_code=status_codes.HTTP_201_CREATED,
    response_model=LeadResponse,
    responses={
        status_codes.HTTP_201_CREATED: {"description": "Success", "model": LeadResponse},
        status_codes.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
        # 422
    }
)
async def create_lead(
        request: LeadRequest,
        target_id: uuid.UUID = Query(default=None),
        db: AsyncSession = Depends(get_db)
):
    manager = LeadManager(db)
    response = await manager.create_lead(request, target_id)
    return response


@router.get(
    "/",
    summary="Получение Лидов",
    status_code=status_codes.HTTP_200_OK,
    response_model=ListLeadResponse,
    responses={
        status_codes.HTTP_200_OK: {"description": "Success", "model": ListLeadResponse},
        status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
        status_codes.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized", "model": ExceptionResponse},
    }

)
async def list_leads(
        status: list[StatusEnum] = Query(default=None, description="Фильтр по Статусу"),
        created_from: datetime = Query(default=None, description="Фильтр по Мин Созданной"),
        created_to: datetime = Query(default=None, description="Фильтр по Мак Созданной"),
        target_id: uuid.UUID = Query(default=None, description="Фильтр по Таргету"),
        sort_by: list[Sort] = Query(default=None, description="Сортировка"),
        page: int = Query(default=1, ge=1, description="Страница"),
        size: int = Query(default=1, ge=1, description="Размер Страницы"),
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = LeadManager(db)
    response = await manager.get_leads(
        status=status,
        created_from=created_from,
        created_to=created_to,
        target_id=target_id,
        sorts=sort_by,
        page=page,
        size=size)
    return response


@router.get(
    "/{lead_id}",
    summary="Получение Лида",
    status_code=status_codes.HTTP_200_OK,
    response_model=LeadResponse,
    responses={
        status_codes.HTTP_200_OK: {"description": "Success", "model": LeadResponse},
        status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
        status_codes.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
    }
)
async def get_lead(
        lead_id: int,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = LeadManager(db)
    response = await manager.get_lead(lead_id)
    return response


@router.put(
    "/{lead_id}",
    summary="Обновление Лида",
    status_code=status_codes.HTTP_204_NO_CONTENT,
    response_model=None,
    responses={
        status_codes.HTTP_204_NO_CONTENT: {"description": "Success"},
        status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
        status_codes.HTTP_403_FORBIDDEN: {"description": "Forbidden", "model": ExceptionResponse},
        status_codes.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
    }
)
async def update_lead(
        lead_id: int,
        request: LeadRequest,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = LeadManager(db)
    await manager.update_lead(lead_id, request, user)


@router.patch(
    "/{lead_id}",
    summary="Частичное Обновление Лида",
    status_code=status_codes.HTTP_204_NO_CONTENT,
    response_model=None,
    responses={
        status_codes.HTTP_204_NO_CONTENT: {"description": "Success"},
        status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
        status_codes.HTTP_403_FORBIDDEN: {"description": "Forbidden", "model": ExceptionResponse},
        status_codes.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
    }
)
async def update_status_lead(
        lead_id: int,
        request: ChangeStatusRequest,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = LeadManager(db)
    await manager.update_status(lead_id, request, user)


@router.delete(
    "/{lead_id}",
    summary="Удаление Лида",
    status_code=status_codes.HTTP_204_NO_CONTENT,
    response_model=None,
    responses={
        status_codes.HTTP_204_NO_CONTENT: {"description": "Success"},
        status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
        status_codes.HTTP_403_FORBIDDEN: {"description": "Forbidden", "model": ExceptionResponse},
        status_codes.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
    }
)
async def delete_lead(
        lead_id: int,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = LeadManager(db)
    await manager.delete_lead(lead_id)


@router.get(
    "/{lead_id}/comments/",
    summary="Получение Комментов Лида",
    status_code=status_codes.HTTP_200_OK,
    response_model=ListLeadCommentResponse,
    responses={
        status_codes.HTTP_200_OK: {"description": "Success", "model": ListLeadCommentResponse},
        status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
        status_codes.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
    }

)
async def get_lead_comments(
        lead_id: int = Path(description="ИД Лида"),
        sort_by: list[Sort] = Query(default=None, description="Сортировка"),
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = LeadManager(db)
    response = await manager.get_comments(lead_id, sort_by)
    return response


@router.post(
    "/{lead_id}/comments/",
    summary="Создание Коммента Лида",
    status_code=status_codes.HTTP_201_CREATED,
    response_model=LeadCommentResponse,
    responses={
        status_codes.HTTP_201_CREATED: {"description": "Success", "model": LeadCommentResponse},
        status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
        status_codes.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
    }
)
async def create_lead_comment(
        lead_id: int,
        request: LeadCommentRequest,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = LeadManager(db)
    response = await manager.add_comment(lead_id, user.id, request)
    return response


@router.get(
    "/{lead_id}/comments/{lead_comment_id}",
    summary="Получение Коммента Лида",
    status_code=status_codes.HTTP_200_OK,
    response_model=LeadCommentResponse,
    responses={
        status_codes.HTTP_200_OK: {"description": "Success", "model": LeadResponse},
        status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
        status_codes.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
    }
)
async def get_lead_comment(
        lead_id: int,
        lead_comment_id: int,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = LeadManager(db)
    response = await manager.get_comment_for(lead_id, lead_comment_id)
    return response


@router.put(
    "/{lead_id}/comments/{lead_comment_id}",
    summary="Обновление Коммента Лида",
    status_code=status_codes.HTTP_204_NO_CONTENT,
    response_model=None,
    responses={
        status_codes.HTTP_204_NO_CONTENT: {"description": "Success"},
        status_codes.HTTP_403_FORBIDDEN: {"description": "Forbidden", "model": ExceptionResponse},
        status_codes.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
    }
)
async def update_lead_comment(
        lead_id: int,
        lead_comment_id: int,
        request: LeadCommentRequest,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = LeadManager(db)
    await manager.update_comment_for(lead_id, lead_comment_id, user.id, request)


@router.delete(
    "/{lead_id}/comments/{lead_comment_id}",
    summary="Удаление Коммента Лида",
    status_code=status_codes.HTTP_204_NO_CONTENT,
    response_model=None,
    responses={
        status_codes.HTTP_204_NO_CONTENT: {"description": "Success"},
        status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
        status_codes.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
    }
)
async def delete_lead_comment(
        lead_id: int,
        lead_comment_id: int,
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)
):
    manager = LeadManager(db)
    await manager.remove_comment(lead_id, lead_comment_id)
