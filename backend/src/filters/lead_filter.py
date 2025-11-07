from datetime import datetime
from typing import Optional, List

from fastapi_filter.contrib.sqlalchemy import Filter

from models.lead import Lead, LeadComment


class LeadFilter(Filter):
    target_id: Optional[str] = None
    order_by: Optional[list[str]] = None
    created_at__lte: Optional[datetime] = None
    created_at__gte: Optional[datetime] = None
    status_id__in: Optional[List[int]] = None

    class Constants(Filter.Constants):
        model = Lead


class LeadCommentFilter(Filter):
    user_id__in: Optional[list[int]] = None
    created_at__lte: Optional[datetime] = None
    created_at__gte: Optional[datetime] = None
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = LeadComment
