from typing import Optional

from fastapi_filter.contrib.sqlalchemy import Filter

from models.company import Company


class CompanyFilter(Filter):
    status__in: Optional[list[str]] = None
    q: Optional[str] = None
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = Company
        search_model_fields = ("name", )
        search_field_name = "q"
