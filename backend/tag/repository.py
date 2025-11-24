from core.repository import BaseRepository
from tag.models import Tag


class TagRepository(BaseRepository):
    model = Tag
