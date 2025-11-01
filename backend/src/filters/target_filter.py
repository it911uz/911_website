from datetime import datetime
from typing import Optional

from fastapi_filter.contrib.sqlalchemy import Filter

from models.target import TargetCompany


class TargetFilter(Filter):
    name__ilike: Optional[str] = None
    is_active: Optional[bool]
    created_at__gte: Optional[datetime] = None
    created_at__lte: Optional[datetime] = None
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = TargetCompany
