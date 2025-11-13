from datetime import datetime
from typing import Optional, Union

from fastapi_filter.contrib.sqlalchemy import Filter

from models.user import User


class UserFilter(Filter):
    q: Optional[str] = None
    role_id__in: list[int] = None
    created_at__lte: Optional[datetime] = None
    updated_at__lte: Optional[datetime] = None
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = User
        search_field_name = "q"
        search_model_fields = ["username", "full_name", "phone_number"]


