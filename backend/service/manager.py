from core.manager import BaseManager
from service.repository import ServiceRepository


class ServiceManager(BaseManager):
    repo_class = ServiceRepository
