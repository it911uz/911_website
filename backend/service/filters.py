from typing import Optional

from fastapi_filter.contrib.sqlalchemy import Filter

from service.models import Service


class ServiceFilter(Filter):
    order_by: list[str] = None
    is_subscription: Optional[bool] = None

    class Constants(Filter.Constants):
        model = Service
