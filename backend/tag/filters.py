from typing import Optional

from fastapi_filter.contrib.sqlalchemy import Filter

from tag.models import Tag


class TagFilter(Filter):
    id__in: Optional[list[int]] = None

    order_by: list[str] = None

    class Constants(Filter.Constants):
        model = Tag
