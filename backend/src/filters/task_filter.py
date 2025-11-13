from datetime import datetime
from typing import List, Optional, Sequence

from fastapi_filter.contrib.sqlalchemy import Filter

from models.user import User
from models.tasks import Task
from models.tag import Tag


class TaskFilter(Filter):
    name__ilike: Optional[str] = None
    users__in: Optional[List[int]] = None
    # statuses: list[int] = None
    tags__in: Optional[List[int]] = None
    created_at__lte: Optional[datetime] = None
    created_at__gte: Optional[datetime] = None
    deadline__gte: Optional[datetime] = None
    deadline__lte: Optional[datetime] = None
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = Task

    def filter(self, stmt):
        users_ids, tags_ids = self.users__in, self.tags__in
        self.users__in = None
        self.tags__in = None

        stmt = super().filter(stmt)

        if users_ids:
            stmt = stmt.filter(Task.users.any(User.id.in_(users_ids)))
        if tags_ids:
            stmt = stmt.filter(Task.tags.any(Tag.id.in_(tags_ids)))

        return stmt