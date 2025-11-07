import uuid

from fastapi import APIRouter, Depends

from fastapi_filter import FilterDepends

from fastapi_pagination import Page, Params

from fastapi_utils.cbv import cbv

from sqlalchemy.ext.asyncio import AsyncSession

from starlette import status

from dependencies import get_current_user, get_db, has_permission

from filters.target_filter import TargetFilter

from models.user import User

from schemas.exceptions import ExceptionResponse
from schemas.target import TargetCompanyRead, TargetCompanyCreate, TargetCompanyUpdate

from services.target_company import TargetCompanyManager

router = APIRouter(
    tags=["target"],
    prefix="/target",
)


@cbv(router)
class TargetCompanyCBV:
    db: AsyncSession = Depends(get_db)
    user: User = Depends(get_current_user)

    @router.post(
        "/",
        summary="Создание Таргет Компании",
        response_model=TargetCompanyRead,
        status_code=status.HTTP_201_CREATED,
        responses={
            status.HTTP_201_CREATED: {"description": "Success", "model": TargetCompanyRead},
            status.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
            # 422
        },
        dependencies=[Depends(has_permission("create_target_company"))]
    )
    async def create_target(
            self,
            request: TargetCompanyCreate,
    ):
        """
        Создание новой компании.


        ### Пример запроса:
        ```json
        {
          "name": "Таргет В Инстаграм"
        }
        ```

        ### Пример ответа (201):
        ```json
        {
          "id": 1,
          "name": "Таргет В Инстаграм"
        }
        ```

        ### Ошибки:
        - **403 Forbidden** — нет прав для создания компании
        - **422	Validation Error** - Ошибка валидации
        """
        manager = TargetCompanyManager(self.db)
        target = await manager.create(**request.model_dump())

        return TargetCompanyRead(
            name=target.name,
            id=target.id,
            url=f"localhost:3000/contacts?target_id={target.id}",
            is_active=target.is_active,
        )

    @router.get(
        "/",
        summary="Получение Всех Таргет Компании",
        response_model=Page[TargetCompanyRead],
        status_code=status.HTTP_200_OK,
        responses={
            status.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
        },
        dependencies=[Depends(has_permission("view_target_company"))]
    )
    async def get_targets(
            self,
            filters: TargetFilter = FilterDepends(TargetFilter),
            params: Params = Depends(),
    ):
        manager = TargetCompanyManager(self.db)
        targets = await manager.list(
            filters=filters,
            params=params
        )
        return targets

    @router.get(
        "/{target_id}",
        summary="Получение Таргет Компании по ИД",
        response_model=TargetCompanyRead,
        status_code=status.HTTP_200_OK,
        responses={
            status.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
            status.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
        },
        dependencies=[Depends(has_permission("view_target_company"))]
    )
    async def get_target(
            self,
            target_id: uuid.UUID
    ):
        manager = TargetCompanyManager(self.db)
        target = await manager.get(target_id)
        return target

    @router.put(
        "/{target_id}",
        summary="Обновление Таргет Компании по ИД",
        status_code=status.HTTP_204_NO_CONTENT,
        response_model=None,
        responses={
            status.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
            status.HTTP_403_FORBIDDEN: {"description": "Forbidden", "model": ExceptionResponse},
            status.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
        },
        dependencies=[Depends(has_permission("update_target_company"))]
    )
    async def update_target(
            self,
            target_id: uuid.UUID,
            request: TargetCompanyUpdate
    ):
        manager = TargetCompanyManager(self.db)
        await manager.update(target_id, **request.model_dump())

    @router.delete(
        "/{target_id}",
        summary="Удаление Таргет Компании по ИД",
        status_code=status.HTTP_204_NO_CONTENT,
        response_model=None,
        responses={
            status.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
            status.HTTP_403_FORBIDDEN: {"description": "Forbidden", "model": ExceptionResponse},
            status.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
        },
        dependencies=[Depends(has_permission("delete_target_company"))]
    )
    async def delete_target(
            self,
            target_id: uuid.UUID
    ):
        manager = TargetCompanyManager(self.db)
        await manager.delete(target_id)
