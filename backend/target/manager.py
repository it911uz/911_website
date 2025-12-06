from core.manager import BaseManager
from target.repository import TargetCompanyRepository


class TargetCompanyManager(BaseManager):
    repo_class = TargetCompanyRepository

    async def delete(self, obj_id):
        obj = await self.repo.get_obj(obj_id)
        await self.repo.delete(obj)


