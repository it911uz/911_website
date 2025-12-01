from datetime import datetime
from typing import Optional

from fastapi_filter.contrib.sqlalchemy import Filter

from target.models import TargetCompany


class TargetFilter(Filter):
    q: Optional[str] = None
    is_active: Optional[bool] = None
    created_at__gte: Optional[datetime] = None
    created_at__lte: Optional[datetime] = None
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = TargetCompany
        search_field_name = "q"
        search_model_fields = ["name"]
