from datetime import datetime
from typing import Optional

from fastapi_filter.contrib.sqlalchemy import Filter

from company.models import Company, CompanyContact, CompanyComment, Subscription, Payment


class CompanyFilter(Filter):
    status__in: Optional[list[str]] = None
    q: Optional[str] = None
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = Company
        search_model_fields = ("name",)
        search_field_name = "q"


class CompanyContactFilter(Filter):
    company_id: int
    q: Optional[str] = None
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = CompanyContact
        search_model_fields = ("full_name",)
        search_field_name = "q"


class CompanyCommentFilter(Filter):
    company_id: int
    created_at__lte: Optional[datetime] = None
    created_at__gte: Optional[datetime] = None
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = CompanyComment


class CompanySubscriptionFilter(Filter):
    company_id: int
    service_id__in: Optional[list[int]] = None
    payment_type: str | None = None
    start_date__lte: Optional[datetime] = None
    start_date__gte: Optional[datetime] = None
    end_date__lte: Optional[datetime] = None
    end_date__gte: Optional[datetime] = None
    created_at__lte: Optional[datetime] = None
    created_at__gte: Optional[datetime] = None
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = Subscription


class PaymentFilter(Filter):
    subscription_id: int
    order_by: Optional[list[str]] = None

    class Constants(Filter.Constants):
        model = Payment
