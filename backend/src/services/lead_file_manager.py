import uuid

from fastapi import UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from exceptions import NotFound
from models.lead import LeadFile, Lead
from repository.lead_file_repo import LeadFileRepository
from repository.lead_repo import LeadRepository
from schemas.lead import LeadFileRead

from services.base_manager import BaseManager
from services.s3_service import S3Service

from utils.cache import redis_cache


class LeadFileManager(BaseManager[LeadFile]):
    def __init__(
            self,
            db: AsyncSession
    ):
        super().__init__(db, LeadFile)
        self.repo = LeadFileRepository(db, LeadFile)
        self.lead_repo = LeadRepository(db, Lead)
        self.s3 = S3Service()

    async def upload(
            self,
            lead_id: int,
            file: UploadFile
    ):

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
            lead_id: int,
    ):
        lead = await self.lead_repo.get(lead_id)
        if not lead:
            raise NotFound(f"Lead {lead_id} not found")
        files = await self.repo.list_by_lead_id(lead_id)
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
