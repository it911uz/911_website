from core.manager import BaseManager
from tag.repository import TagRepository


class TagManager(BaseManager):
    repo_class = TagRepository
