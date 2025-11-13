from datetime import datetime
from typing import Optional, Union

from fastapi_filter.contrib.sqlalchemy import Filter
from sqlalchemy import Select, or_
from sqlalchemy.orm import Query

from models.user import User


class UserFilter(Filter):
    q: Optional[str] = None
    role_id__in: list[int] = None
    created_at__lte: Optional[datetime] = None
    updated_at__lte: Optional[datetime] = None
    order_by: Optional[list[int]] = None

    class Constants(Filter.Constants):
        model = User

    def filter(self, query: Union[Query, Select]):
        query = super().filter(query)
        if self.q:
            query = query.filter(
                or_(
                    User.full_name.ilike(f"%{self.q}%"),
                    User.phone_number.ilike(f"%{self.q}%"),
                    User.username.ilike(f"%{self.q}%"),
                )
            )
        return query
