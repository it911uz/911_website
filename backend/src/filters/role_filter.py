from typing import Optional

from fastapi_filter.contrib.sqlalchemy import Filter

from models import Role


class RoleFilter(Filter):
    name__ilike:Optional[str]
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = Role