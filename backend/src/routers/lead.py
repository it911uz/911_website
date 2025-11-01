from fastapi import APIRouter, Depends
from fastapi_filter import FilterDepends
from fastapi_pagination import Page
from fastapi_utils.cbv import cbv

from starlette import status as status_codes

from sqlalchemy.ext.asyncio import AsyncSession

from dependencies import get_db, get_current_user
from filters.lead_filter import LeadFilter

from models.user import User

from schemas.exceptions import ExceptionResponse
from schemas.lead import LeadCreate, LeadRead, LeadUpdate, LeadUpdateStatus

from services.lead_manager import LeadManager

router = APIRouter(
    tags=["lead"],
    prefix="/leads"
)


@cbv(router)
class LeadRouter:
    db: AsyncSession = Depends(get_db)

    @router.post(
        "/",
        summary="Создание Лида",
        status_code=status_codes.HTTP_201_CREATED,
        response_model=LeadRead,
        responses={
            status_codes.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
            # 422
        }
    )
    async def create_lead(
            self,
            request: LeadCreate
    ):
        manager = LeadManager(self.db)
        response = await manager.create(**request.model_dump())
        return response

    @router.get(
        "/",
        summary="Получение Лидов",
        status_code=status_codes.HTTP_200_OK,
        response_model=Page[LeadRead],
        responses={
            status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
            status_codes.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized", "model": ExceptionResponse},
        }

    )
    async def list_leads(
            self,
            filters: LeadFilter = FilterDepends(LeadFilter),
            user: User = Depends(get_current_user)
    ):
        manager = LeadManager(self.db)
        response = await manager.list(
            filters=filters,
        )
        return response

    @router.get(
        "/{lead_id}",
        summary="Получение Лида",
        status_code=status_codes.HTTP_200_OK,
        response_model=LeadRead,
        responses={
            status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
            status_codes.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
        }
    )
    async def get_lead(
            self,
            lead_id: int,
            user: User = Depends(get_current_user)
    ):
        manager = LeadManager(self.db)
        response = await manager.get(lead_id)
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
            self,
            lead_id: int,
            request: LeadUpdate,
            user: User = Depends(get_current_user)
    ):
        manager = LeadManager(self.db)
        await manager.update(lead_id, **request.model_dump())

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
            self,
            lead_id: int,
            request: LeadUpdateStatus,
            user: User = Depends(get_current_user)
    ):
        manager = LeadManager(self.db)
        await manager.update(lead_id, **request.model_dump())

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
            self,
            lead_id: int,
            user: User = Depends(get_current_user)
    ):
        manager = LeadManager(self.db)
        await manager.delete(lead_id)

#
# @router.get(
#     "/{lead_id}/comments/",
#     summary="Получение Комментов Лида",
#     status_code=status_codes.HTTP_200_OK,
#     response_model=ListLeadCommentResponse,
#     responses={
#         status_codes.HTTP_200_OK: {"description": "Success", "model": ListLeadCommentResponse},
#         status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
#         status_codes.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
#     }
#
# )
# async def get_lead_comments(
#         lead_id: int = Path(description="ИД Лида"),
#         sort_by: list[Sort] = Query(default=None, description="Сортировка"),
#         user: User = Depends(get_current_user),
#         db: AsyncSession = Depends(get_db)
# ):
#     manager = LeadManager(db)
#     response = await manager.get_comments(lead_id, sort_by)
#     return response
#
#
# @router.post(
#     "/{lead_id}/comments/",
#     summary="Создание Коммента Лида",
#     status_code=status_codes.HTTP_201_CREATED,
#     response_model=LeadCommentResponse,
#     responses={
#         status_codes.HTTP_201_CREATED: {"description": "Success", "model": LeadCommentResponse},
#         status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
#         status_codes.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
#     }
# )
# async def create_lead_comment(
#         lead_id: int,
#         request: LeadCommentRequest,
#         user: User = Depends(get_current_user),
#         db: AsyncSession = Depends(get_db)
# ):
#     manager = LeadManager(db)
#     response = await manager.add_comment(lead_id, user.id, request)
#     return response
#
#
# @router.get(
#     "/{lead_id}/comments/{lead_comment_id}",
#     summary="Получение Коммента Лида",
#     status_code=status_codes.HTTP_200_OK,
#     response_model=LeadCommentResponse,
#     responses={
#         status_codes.HTTP_200_OK: {"description": "Success", "model": LeadResponse},
#         status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
#         status_codes.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
#     }
# )
# async def get_lead_comment(
#         lead_id: int,
#         lead_comment_id: int,
#         user: User = Depends(get_current_user),
#         db: AsyncSession = Depends(get_db)
# ):
#     manager = LeadManager(db)
#     response = await manager.get_comment_for(lead_id, lead_comment_id)
#     return response
#
#
# @router.put(
#     "/{lead_id}/comments/{lead_comment_id}",
#     summary="Обновление Коммента Лида",
#     status_code=status_codes.HTTP_204_NO_CONTENT,
#     response_model=None,
#     responses={
#         status_codes.HTTP_204_NO_CONTENT: {"description": "Success"},
#         status_codes.HTTP_403_FORBIDDEN: {"description": "Forbidden", "model": ExceptionResponse},
#         status_codes.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
#     }
# )
# async def update_lead_comment(
#         lead_id: int,
#         lead_comment_id: int,
#         request: LeadCommentRequest,
#         user: User = Depends(get_current_user),
#         db: AsyncSession = Depends(get_db)
# ):
#     manager = LeadManager(db)
#     await manager.update_comment_for(lead_id, lead_comment_id, user.id, request)
#
#
# @router.delete(
#     "/{lead_id}/comments/{lead_comment_id}",
#     summary="Удаление Коммента Лида",
#     status_code=status_codes.HTTP_204_NO_CONTENT,
#     response_model=None,
#     responses={
#         status_codes.HTTP_204_NO_CONTENT: {"description": "Success"},
#         status_codes.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
#         status_codes.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
#     }
# )
# async def delete_lead_comment(
#         lead_id: int,
#         lead_comment_id: int,
#         user: User = Depends(get_current_user),
#         db: AsyncSession = Depends(get_db)
# ):
#     manager = LeadManager(db)
#     await manager.remove_comment(lead_id, lead_comment_id)
