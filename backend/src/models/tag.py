from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from models.base import Base
from models.mixins import TimeStampMixin
from models.tasks import task_tags


class Tag(Base, TimeStampMixin):
    __tablename__ = 'tags'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), unique=True)
    hex = Column(String(7), default="#ffffff")
    tasks = relationship("Task", secondary=task_tags, back_populates="tags")