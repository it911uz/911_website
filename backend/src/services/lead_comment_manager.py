from sqlalchemy.ext.asyncio import AsyncSession

from exceptions import BadRequest, NotFound
from models.lead import LeadComment, Lead
from repository.base_repo import ModelType
from repository.lead_repo import LeadRepository, LeadCommentRepository
from services.base_manager import BaseManager


class LeadCommentManager(BaseManager[LeadComment]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, LeadComment)
        self.repo = LeadCommentRepository(db, LeadComment)
        self.lead_repo = LeadRepository(db, Lead)

    async def create(self, **kwargs) -> ModelType:
        await self._check_lead(kwargs.get('lead_id'))
        comment = await self.repo.create(
            **kwargs
        )
        return comment

    async def update(self, lead_comment_id: int, **kwargs) -> ModelType:
        await self._check_lead(kwargs.get('lead_id'))
        return super().update(**kwargs)

    async def delete_comment(self, lead_id: int, lead_comment_id: int) -> None:
        await self._check_lead(lead_id)
        obj = await self.get(lead_comment_id)
        await self.repo.delete(obj)

    async def get_comment(self, lead_id: int, lead_comment_id: int):
        await self._check_lead(lead_id)
        response = await self.get(lead_comment_id)
        return response

    async def _check_lead(self, lead_id: int | None):
        if lead_id is None:
            raise BadRequest('Lead ID is required')
        lead = self.lead_repo.get(lead_id)

        if not lead:
            raise NotFound('Lead not found')

    async def get_lead_comments(self, lead_id: int, filters=None):
        await self._check_lead(lead_id)
        response = await self.repo.list_comments(lead_id, filters)
        return response
