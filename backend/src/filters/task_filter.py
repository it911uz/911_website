from datetime import datetime

from sqlalchemy import Select

from filters.operators import LikeFilter, InFilter, RangeFilter
from models.tasks import Task


class TaskFilter:
    def __init__(
            self,
            name: str = None,
            users: list[int] = None,
            statuses: list[int] = None,
            tags: list[int] = None,
            created_from: datetime = None,
            created_to: datetime = None,
            deadline_from: datetime = None,
            deadline_to: datetime = None,
    ):
        self.filters = [
            LikeFilter(Task.name, name),
            InFilter(Task.users, users),
            InFilter(Task.status_id, statuses),
            InFilter(Task.tags, tags),
            RangeFilter(Task.created_at, created_from, created_to),
            RangeFilter(Task.deadline, deadline_from, deadline_to),
        ]

    def apply(self, stmt: Select):
        for f in self.filters:
            stmt = f.apply(stmt)
        return stmt
