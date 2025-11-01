from datetime import datetime
from typing import Optional

from fastapi_filter.contrib.sqlalchemy import Filter

from models.lead import Lead, LeadComment


class LeadFilter(Filter):
    # InFilter(Lead.status, status__in)
    target_id: int | None = None
    order_by: Optional[list[str]] = None
    created_at__lte: Optional[datetime] = None
    created_at__gte: Optional[datetime] = None

    class Constants(Filter.Constants):
        model = Lead


class LeadCommentFilter(Filter):
    user_id__in: Optional[list[int]] = None
    created_at__lte: Optional[datetime] = None
    created_at__gte: Optional[datetime] = None
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = LeadComment
