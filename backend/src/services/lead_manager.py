import uuid

from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession

from cache import redis_cache

from exceptions import NotFound, Forbidden

from filters.lead_filter import LeadFilter, LeadCommentFilter
from filters.paginator import Paginator
from filters.sorter import Sorter
from models.target import TargetCompany
from models.user import User

from models.lead import StatusEnum, Lead, LeadComment

from repository.lead_repo import LeadRepository, LeadCommentRepository
from repository.taget_repo import TargetCompanyRepository

from schemas.base import Sort
from schemas.lead import (
    LeadRequest,
    LeadResponse,
    LeadCommentRequest,
    LeadCommentResponse,
    ListLeadResponse,
    ListLeadCommentResponse,
    ChangeStatusRequest
)


class LeadManager:
    def __init__(
            self,
            db: AsyncSession
    ):
        self.repo = LeadRepository(db, Lead)
        self.comment_repo = LeadCommentRepository(db, LeadComment)
        self.target_repo = TargetCompanyRepository(db, TargetCompany)



    async def create_lead(
            self,
            request: LeadRequest,
            target_id: uuid.UUID = None
    ):
        if target_id:
            target = await self.target_repo.get(target_id)
            if not target:
                raise NotFound(f"Target with id {target_id} not found")
        request.target_id = target_id
        lead = await self.repo.create(**request.model_dump())
        return LeadResponse.model_validate(lead)

    async def update_lead(
            self,
            lead_id: int,
            request: LeadRequest,
            user: User,
    ):
        lead = await self.repo.get(lead_id)
        if not lead:
            raise NotFound(f"Lead with id {lead_id} not found")
        if lead.status == StatusEnum.DEAL and not user.is_superuser:
            raise Forbidden("Вы не сможете менять статус")
        lead.full_name = request.full_name
        lead.email = request.email
        lead.phone = request.phone
        lead.status = request.status
        lead.company_name = request.company_name
        lead.company_info = request.company_info
        lead.target_id = request.target_id

        await self.repo.update(lead)

    async def delete_lead(
            self,
            lead_id: int,
    ):
        lead = await self.repo.get(lead_id)
        if not lead:
            raise NotFound(f"Lead with id {lead_id} not found")
        await self.repo.delete(lead)

    async def get_lead(
            self,
            lead_id: int,
    ):
        lead = await self.repo.get(lead_id)
        if not lead:
            raise NotFound(f"Lead with id {lead_id} not found")
        return LeadResponse.model_validate(lead)

    @redis_cache(prefix="leads:list", ttl=120)
    async def get_leads(
            self,
            status: list[StatusEnum] = None,
            target_id: uuid.UUID = None,
            created_from: datetime = None,
            created_to: datetime = None,
            sorts: list[Sort] = None,
            page: int = 1,
            size: int = 50
    ):
        filters = LeadFilter(
            status,
            target_id,
            created_from,
            created_to
        )

        if sorts:
            sorters = []

            for sort_by in sorts:
                col, destination = sort_by.split(":")
                col = getattr(Lead, col)
                sorters.append((col, destination))

            sorter = Sorter(
                tuple(sorters)
            )
        else:
            sorter = None

        paginator = Paginator(
            page=page,
            size=size
        )

        leads = await self.repo.list(
            filters=filters,
            sorter=sorter,
            paginator=paginator,
        )
        return ListLeadResponse(
            **leads
        )

    async def add_comment(
            self,
            lead_id: int,
            user_id: int,
            request: LeadCommentRequest
    ):
        lead = await self.repo.get(lead_id)
        if not lead:
            raise NotFound(f"Lead with id {lead_id} not found")
        comment = await self.comment_repo.create(**request.model_dump(), user_id=user_id)
        return LeadCommentResponse.model_validate(comment)

    async def remove_comment(
            self,
            lead_id: int,
            lead_comment_id: int,
    ):
        lead = await self.repo.get(lead_id)
        if not lead:
            raise NotFound(f"Lead with id {lead_id} not found")
        lead_comment = await self.comment_repo.get(lead_comment_id)
        if not lead_comment:
            raise NotFound(f"Lead comment with id {lead_comment_id} not found")
        await self.comment_repo.delete(lead_comment)

    async def get_comments(
            self,
            lead_id: int,
            sorts: list[Sort] = None
    ):
        sorters = []

        for sort_by in sorts:
            col, destination = sort_by.split(":")
            col = getattr(Lead, col)
            sorters.append((col, destination))

        sorter = Sorter(
            tuple(sorters)
        )
        comments = await self.comment_repo.list(
            filters=LeadCommentFilter(
                lead_id=lead_id
            ),
            sorter=sorter
        )
        return ListLeadCommentResponse.model_validate(comments)

    async def get_comment_for(
            self,
            lead_id: int,
            lead_comment_id: int,
    ):
        lead = await self.repo.get(lead_id)
        if not lead:
            raise NotFound(f"Lead with id {lead_comment_id} not found")
        lead_comment = await self.comment_repo.get(lead_comment_id)
        if not lead_comment:
            raise NotFound(f"Lead comment with id {lead_comment_id} not found")
        return LeadCommentResponse.model_validate(lead_comment)

    async def update_comment_for(
            self,
            lead_id: int,
            lead_comment_id: int,
            user_id: int,
            request: LeadCommentRequest
    ):
        lead = await self.repo.get(lead_id)
        if not lead:
            raise NotFound(f"Lead with id {lead_comment_id} not found")
        lead_comment = await self.comment_repo.get(lead_comment_id)
        if not lead_comment:
            raise NotFound(f"Lead comment with id {lead_comment_id} not found")
        lead_comment.comment = request.comment
        lead_comment.user_id = user_id
        await self.comment_repo.update(lead_comment)

    async def update_status(
            self,
            lead_id: int,
            request: ChangeStatusRequest,
            user: User
    ):
        lead = await self.repo.get(lead_id)
        if not lead:
            raise NotFound(f"Lead with id {lead_id} not found")
        if lead.status == StatusEnum.DEAL and not user.is_superuser:
            raise Forbidden("Вы не сможете менять статус")
        lead.status = request.status
        await self.repo.update(lead)
