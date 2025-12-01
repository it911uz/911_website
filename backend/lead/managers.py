import uuid

from fastapi import UploadFile
from fastapi_filter.contrib.sqlalchemy import Filter
from sqlalchemy.ext.asyncio import AsyncSession

from core.exceptions import NotFound, Forbidden
from core.manager import BaseManager, CacheMixin
from core.repository import ModelType
from core.services import S3Service

from lead.models import LeadStatus
from lead.repository import LeadRepository, LeadCommentRepository, LeadStatusRepository, LeadFileRepository
from lead.schemas import LeadMove, LeadFileRead, LeadRead

from target.repository import TargetCompanyRepository

from user.repository import UserRepository


class LeadManager(CacheMixin, BaseManager):
    repo_class = LeadRepository
    fk_fields = {
        "status_id": LeadStatusRepository,
        "target_id": TargetCompanyRepository
    }
    cache_entity = "lead"
    read_schema = LeadRead

    def __init__(
            self,
            db: AsyncSession
    ):
        super().__init__(db)

    async def move_lead(self, request: LeadMove):
        lead = await self.repo.get(request.lead_id)
        if not lead:
            return
        lead.status_id = request.status_id
        await self.repo.update(lead)


class LeadCommentManager(BaseManager):
    repo_class = LeadCommentRepository
    fk_fields = {
        "lead_id": LeadRepository,
        "user_id": UserRepository
    }

    async def _check_lead(self, obj_id: int):
        lead = await self.lead_repo.get(self.lead_id)
        if not lead:
            raise NotFound(f"Lead with id {obj_id} not found")
        comment = await self.repo.get(obj_id)

        if not comment:
            raise NotFound(f"Lead with id {obj_id} not found")

        if comment.lead_id != lead.id:
            raise Forbidden(f"Lead Comment with id {obj_id} does not belong to this lead")

    def __init__(self, db: AsyncSession, lead_id: int):
        super().__init__(db)
        self.lead_id = lead_id
        self.lead_repo = LeadRepository(db)

    async def get(self, obj_id, **kwargs) -> ModelType:
        await self._check_lead(obj_id)
        return await super().get(obj_id)

    async def delete(self, obj_id):
        await self._check_lead(obj_id)
        return await super().delete(obj_id)


class LeadStatusManager(BaseManager):
    repo_class = LeadStatusRepository
    unique_fields = ["name"]

    async def create(self, **kwargs) -> ModelType:
        max_level = await self.repo.get_max_level()
        kwargs['level'] = max_level + 1
        return await super().create(**kwargs)

    async def update(self, obj_id, **kwargs) -> ModelType:
        await self.check_unique(
            self.repo,
            kwargs,
            obj_id
        )
        obj = await self.repo.get(obj_id)
        if not obj:
            raise NotFound("Lead Status Not Found")
        if not obj.can_edit:
            raise Forbidden("Нельзя ")
        for k, v in kwargs.items():
            setattr(obj, k, v)
        await self.repo.update(obj)
        return obj

    async def delete(self, obj_id) -> None:
        obj: LeadStatus = await self.get(obj_id)
        if not obj.can_delete:
            raise Forbidden("Нельзя ")
        deleted_level = obj.level

        await self.repo.delete(obj)
        await self.repo.move_deleted(deleted_level)

    async def move(self, status_id: int, new_position: int):
        """Перемещение статуса на новую позицию"""
        # Получаем статус
        status = await self.repo.get(status_id)
        if not status:
            raise NotFound("Lead Status Not Found")
        old_position = status.level
        if old_position == new_position:
            return None
        # Если двигаем вверх
        await self.repo.move_level(status_id, new_position, old_position)
        # Обновляем позицию текущего статуса
        status.level = new_position
        await self.repo.update(status)
        return None


class LeadFileManager(BaseManager):
    repo_class = LeadFileRepository
    fk_fields = {
        "lead_id": LeadRepository,
    }

    def __init__(
            self,
            db: AsyncSession
    ):
        super().__init__(db)
        self.lead_repo = LeadRepository(db)
        self.s3 = S3Service()

    async def upload(
            self,
            lead_id: int,
            file: UploadFile
    ):
        lead = await self.lead_repo.get(lead_id)
        if not lead:
            raise NotFound(f"Lead {lead_id} not found")
        file_id = uuid.uuid4()
        key = f"leads/{lead_id}/{file_id}-{file.filename}"
        await self.s3.upload_file(
            file,
            key
        )
        await self.repo.create(
            lead_id=lead_id,
            id=file_id,
            filename=file.filename,
            key=key,
        )

    async def list_files(
            self,
            filters: Filter,
    ):
        files = await self.repo.list(filters)
        data = [
            LeadFileRead(
                id=file.id,
                filename=file.filename,
                url=self.s3.get_presigned_url(
                    file.key
                )
            )
            for file in files
        ]
        return data

    async def delete_file(self, lead_id: int, file_id: uuid.UUID):
        lead = await self.lead_repo.get(lead_id)
        if not lead:
            raise NotFound(f"Lead {lead_id} not found")
        file = await self.repo.get(file_id)
        if not file:
            raise NotFound(f"File {file_id} not found")

        await self.s3.delete_file(file.key)

        await self.repo.delete(file)
