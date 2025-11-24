from datetime import datetime
from typing import Optional

from fastapi_filter.contrib.sqlalchemy import Filter
from pydantic import Field

from user.models import User


class UserFilter(Filter):
    id__in: Optional[list[int]] = None
    q: Optional[str] = None
    role_id__in: list[int] = None
    created_at__lte: Optional[datetime] = None
    updated_at__lte: Optional[datetime] = None
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = User
        search_field_name = "q"
        search_model_fields = ["username", "full_name", "phone_number"]


class UserTaskFilter(Filter):
    id__in: Optional[list[int]] = Field(default=None)

    class Constants(Filter.Constants):
        model = User


