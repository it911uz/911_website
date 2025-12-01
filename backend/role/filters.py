from typing import Optional

from fastapi_filter.contrib.sqlalchemy import Filter

from role.models import Role, Permission


class PermissionFilter(Filter):
    id__in: list[int] = []
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = Permission


class RoleFilter(Filter):
    q: Optional[str] = None
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = Role
        search_model_fields = ("name",)
        search_field_name = "q"
