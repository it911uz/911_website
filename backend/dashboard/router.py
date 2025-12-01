from datetime import datetime, date

from fastapi import APIRouter, Depends
from fastapi_utils.cbv import cbv
from sqlalchemy.ext.asyncio import AsyncSession

from core.dependencies import get_db

from dashboard.manager import DashboardManager

router = APIRouter(
    prefix="/dashboard",
    tags=["dashboard"],
)

from lead.repository import LeadPeriod


@cbv(router)
class DashboardCBV:
    db: AsyncSession = Depends(get_db)

    @router.get("/leads")
    async def get_leads(
            self,
            date_from: date,
            date_to: date,
            period: LeadPeriod
    ):
        manager = DashboardManager(db=self.db)
        response = await manager.get_leads(date_from, date_to, period)
        return response
