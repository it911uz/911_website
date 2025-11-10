from datetime import datetime
from typing import List, Optional, Sequence

from fastapi_filter.contrib.sqlalchemy import Filter

from models.tasks import Task


class TaskFilter(Filter):
    name__ilike: Optional[str] = None
    users__id__in: Optional[List[int]] = None
    # statuses: list[int] = None
    tags__id__in: Optional[List[int]] = None
    created_at__lte: Optional[datetime] = None
    created_at__gte: Optional[datetime] = None
    deadline__gte: Optional[datetime] = None
    deadline__lte: Optional[datetime] = None
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = Task