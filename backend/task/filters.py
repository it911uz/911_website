from typing import Optional

from fastapi_filter import FilterDepends, with_prefix
from fastapi_filter.contrib.sqlalchemy import Filter

from task.models import Task, TaskStatus, TaskComment, TaskFiles
from user.filters import UserTaskFilter


class TaskFilter(Filter):
    q: str | None = None
    status_id__in: Optional[list[int]] = None
    users: Optional[UserTaskFilter] = FilterDepends(
        with_prefix("users", UserTaskFilter) #id__in
    )
    order_by: list[str] = None

    class Constants(Filter.Constants):
        model = Task
        search_model_fields = ["name"]
        search_field_name = "q"

class TaskStatusFilter(Filter):
    order_by: list[str] = None

    class Constants(Filter.Constants):
        model = TaskStatus


class TaskCommentFilter(Filter):
    task_id: int
    order_by: list[str] = None

    class Constants(Filter.Constants):
        model = TaskComment


class TaskFileFilter(Filter):
    task_id: int
    order_by: list[str] = None

    class Constants(Filter.Constants):
        model = TaskFiles
