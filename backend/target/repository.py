from fastapi_pagination.ext.sqlalchemy import paginate
from sqlalchemy import select, func, String, literal

from clicks.models import Click
from core.repository import BaseRepository, ModelType
from lead.models import Lead
from target.models import TargetCompany


class TargetCompanyRepository(BaseRepository):
    model = TargetCompany

    async def get(self, obj_id) -> ModelType:
        stmt = (select(
            TargetCompany.id,
            TargetCompany.name,
            TargetCompany.is_active,
            func.count(Lead.id).label("leads_count"),
            func.count(Click.id).label("clicks_count"),
            (literal("https://it911.uz/c/") + func.cast(TargetCompany.id, String)).label("url")
        )
                .outerjoin(Lead, Lead.target_id == TargetCompany.id)
                .outerjoin(Click, Click.target_id == TargetCompany.id)
                .group_by(TargetCompany.id)
                .where(TargetCompany.id == obj_id))
        target_company = await self.db.execute(stmt)
        row = target_company.mappings().one_or_none()
        return row if row else None

    async def list(
            self,
            filters=None,
            params=None,
    ):
        stmt = (select(
            TargetCompany.id,
            TargetCompany.name,
            TargetCompany.is_active,
            func.count(Lead.id).label("leads_count"),
            func.count(Click.id).label("clicks_count"),
            (literal("https://it911.uz/c/") + func.cast(TargetCompany.id, String)).label("url")
        )
                .outerjoin(Lead, Lead.target_id == TargetCompany.id)
                .outerjoin(Click, Click.target_id == TargetCompany.id)
                .group_by(TargetCompany.id))

        stmt = filters.filter(stmt)
        stmt = filters.sort(stmt)

        return await paginate(self.db, stmt)
