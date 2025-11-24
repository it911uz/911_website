from datetime import datetime
from typing import Optional

from fastapi_filter.contrib.sqlalchemy import Filter

from lead.models import Lead, LeadComment, LeadFile


class LeadFilter(Filter):
    target_id: int | None = None
    order_by: Optional[list[str]] = None
    created_at__lte: Optional[datetime] = None
    created_at__gte: Optional[datetime] = None
    status_id__in: list[int] = None

    class Constants(Filter.Constants):
        model = Lead


class LeadCommentFilter(Filter):
    lead_id: int
    user_id__in: Optional[list[int]] = None
    created_at__lte: Optional[datetime] = None
    created_at__gte: Optional[datetime] = None
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = LeadComment


class LeadFileFilter(Filter):
    lead_id: int
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = LeadFile
