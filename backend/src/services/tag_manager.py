from exceptions import NotFound
from schemas.tag import TagRequest, TagResponse
from repository.tag import TagRepository
from models.tag import Tag
from services.base_manager import BaseManager
from sqlalchemy.ext.asyncio import AsyncSession


class TagManager(BaseManager[Tag]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Tag)
        self.repo = self.repo = TagRepository(db, Tag)

    async def create_tag(self, request: TagRequest):
        return await self.repo.create(
            **request.model_dump()
        )
    
    async def update_tag(
            self,
            tag_id: int,
            request: TagRequest,
    ):
        tag = await self.repo.get(tag_id)
        if not tag:
            raise NotFound(f"Tag with id {tag_id} not found")

        tag.name = request.name
        tag.hex = request.hex

        await self.repo.update(
            tag
        )

    async def delete_tag(
            self,
            tag_id: int,
    ):
        tag = await self.repo.get(tag_id)
        if not tag:
            raise NotFound(f"Tag with id {tag_id} not found")
        await self.repo.delete(tag)