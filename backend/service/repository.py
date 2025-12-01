from core.repository import BaseRepository
from service.models import Service


class ServiceRepository(BaseRepository):
    model = Service