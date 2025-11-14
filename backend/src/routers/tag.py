from fastapi_pagination import Page
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter
from schemas.tag import TagRequest, TagResponse
from services.tag_manager import TagManager
from dependencies import get_db, has_permission
from fastapi.params import Depends

router = APIRouter(
    tags=["tags"],
    prefix="/tags"
)


@cbv(router)
class TagCBV:
    db: AsyncSession = Depends(get_db)

    @router.get(
        "/",
        response_model=Page[TagResponse],
        dependencies=[Depends(has_permission("view_tags"))]
    )
    async def get_tags(
            self,
    ):
        manager = TagManager(db=self.db)
        response = await manager.list()
        return response

    @router.put(
        "/{tag_id}",
        dependencies=[Depends(has_permission("update_tags"))]
    )
    async def update(
            self,
            tag_id: int,
            request: TagRequest,
    ):
        manager = TagManager(db=self.db)
        await manager.update_tag(tag_id, request)

    @router.delete(
        "/{tag_id}",
        dependencies=[Depends(has_permission("delete_tags"))]
    )
    async def delete(
            self,
            tag_id: int,
            db: AsyncSession = Depends(get_db)
    ):
        manager = TagManager(db)
        await  manager.delete_tag(tag_id)

    @router.post(
        "/",
        dependencies=[Depends(has_permission("create_tags"))]
    )
    async def create_status(
            self,
            request: TagRequest,
    ):
        manager = TagManager(db=self.db)
        return await manager.create_tag(request)
