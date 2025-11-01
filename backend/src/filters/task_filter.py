from datetime import datetime
from typing import Optional

from fastapi_filter.contrib.sqlalchemy import Filter

from models.tasks import Task


class TaskFilter(Filter):
    name__ilike: str | None = None,
    # users: list[int] = None,
    # statuses: list[int] = None,
    # tags: list[int] = None,
    created_at__lte: datetime | None = None,
    created_at__gte: datetime | None = None,
    deadline__gte: datetime | None = None,
    deadline__lte: datetime | None = None,
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = Task
