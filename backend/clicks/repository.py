from clicks.models import Click
from core.repository import BaseRepository


class ClickRepository(BaseRepository):
    model = Click
