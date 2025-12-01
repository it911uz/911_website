from clicks.repository import ClickRepository
from core.manager import BaseManager
from target.repository import TargetCompanyRepository


class ClickManager(BaseManager):
    repo_class = ClickRepository
    fk_fields = {
        "target_id": TargetCompanyRepository
    }
