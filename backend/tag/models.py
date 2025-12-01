from sqlalchemy import Column, Integer, String

from core.mixins import TimeStampMixin
from core.models import Base


class Tag(Base, TimeStampMixin):
    __tablename__ = 'tags'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), unique=True)
    hex = Column(String(7), default="#000000  ")
