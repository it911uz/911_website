from fastapi import APIRouter, Depends
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from auth.dependencies import has_permission
from core.dependencies import get_db
from tag.manager import TagManager
from tag.schemas import TagRead, TagCreate, TagUpdate

router = APIRouter(
    prefix="/tags",
    tags=["tags"],
)


@cbv(router)
class TagCBV:
    db: AsyncSession = Depends(get_db)

    @router.post(
        "/",
        status_code=status.HTTP_201_CREATED,
        response_model=TagRead,
        dependencies=[Depends(has_permission("create_tags"))]
    )
    async def create_tag(
            self,
            request: TagCreate,
    ):
        manager = TagManager(db=self.db)
        tag = await manager.create(
            **request.model_dump()
        )
        return tag

    @router.get(
        "/",
        response_model=list[TagRead],
        dependencies=[Depends(has_permission("view_tags"))]
    )
    async def get_tags(
            self
    ):
        manager = TagManager(db=self.db)
        response = await manager.list()
        return response

    @router.put(
        "/{tag_id}",
        status_code=status.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("update_tags"))]
    )
    async def update_tag(
            self,
            tag_id: int,
            request: TagUpdate,
    ):
        manager = TagManager(db=self.db)
        await manager.update(tag_id, **request.model_dump())

    @router.delete(
        "/{tag_id}",
        status_code=status.HTTP_204_NO_CONTENT,
        dependencies=[Depends(has_permission("delete_tags"))]
    )
    async def delete_tag(
            self,
            tag_id: int,
    ):
        manager = TagManager(db=self.db)
        await manager.delete(tag_id)
