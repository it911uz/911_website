from datetime import datetime
from typing import Optional

from fastapi_filter.contrib.sqlalchemy import Filter

from models.company import Company, CompanyContact, CompanyComment, Subscription


class CompanyFilter(Filter):
    status__in: Optional[list[str]] = None
    q: Optional[str] = None
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = Company
        search_model_fields = ("name",)
        search_field_name = "q"


class CompanyContactFilter(Filter):
    q: Optional[str] = None
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = CompanyContact
        search_model_fields = ("full_name",)
        search_field_name = "q"


class CompanyCommentFilter(Filter):
    created_at_lte: Optional[datetime] = None
    created_at_gte: Optional[datetime] = None
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = CompanyComment


class CompanySubscriptionFilter(Filter):
    service_id__in: Optional[list[int]] = None
    payment_type_in: Optional[list[str]] = None
    start_date_lte: Optional[datetime] = None
    start_date_gte: Optional[datetime] = None
    end_date_lte: Optional[datetime] = None
    end_date_gte: Optional[datetime] = None
    created_at_lte: Optional[datetime] = None
    created_at_gte: Optional[datetime] = None
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = Subscription
