from sqlalchemy import select

from models.deal import Deal
from repository.base_repo import BaseRepository
from repository.query_builder import QueryBuilder


class DealRepository(BaseRepository[Deal]):
    pass