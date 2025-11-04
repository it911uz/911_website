from sqlalchemy.ext.asyncio import AsyncSession

from models.target import TargetCompany

from repository.taget_repo import TargetCompanyRepository

from services.base_manager import BaseManager


class TargetCompanyManager(BaseManager[TargetCompany]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, TargetCompany)
        self.repo: TargetCompanyRepository = TargetCompanyRepository(db, TargetCompany)


