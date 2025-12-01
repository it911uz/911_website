from core.manager import BaseManager
from target.repository import TargetCompanyRepository


class TargetCompanyManager(BaseManager):
    repo_class = TargetCompanyRepository


