from datetime import datetime, date

from sqlalchemy.ext.asyncio import AsyncSession

from lead.repository import LeadRepository, LeadPeriod


class DashboardManager:
    def __init__(self, db: AsyncSession):
        self.lead_repo = LeadRepository(db)

    async def get_leads(
            self,
            date_from: date,
            date_to: date,
            period: LeadPeriod

    ):
        data = await self.lead_repo.get_leads_chart(
            period=period,
            start_date=date_from,
            end_date=date_to,
        )
        return data
