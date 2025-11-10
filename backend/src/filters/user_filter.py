from datetime import datetime
from typing import Optional

from fastapi_filter.contrib.sqlalchemy import Filter

from models.user import User


class UserFilter(Filter):
    full_name__ilike: Optional[str] = None
    username__ilike: Optional[str] = None
    role_id__in: list[int] = None
    created_at__lte: Optional[datetime] = None
    updated_at__lte: Optional[datetime] = None
    order_by: Optional[list[int]] = None
    class Constants(Filter.Constants):
        model = User
