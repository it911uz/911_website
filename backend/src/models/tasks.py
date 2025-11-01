from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Table
from sqlalchemy.orm import relationship

from models.base import Base
from models.mixins import TimeStampMixin

task_tags = Table(
    "task_tags",
    Base.metadata,
    Column("task_id", ForeignKey("tasks.id", ondelete="CASCADE"), primary_key=True),
    Column("tag_id", ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True),
)

user_tasks = Table(
    "user_tasks",
    Base.metadata,
    Column("task_id", ForeignKey("tasks.id"), primary_key=True),
    Column("user_id", ForeignKey("users.id"), primary_key=True),
)


class TaskStatus(Base):
    __tablename__ = "task_statuses"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), unique=True)
    is_completed = Column(Boolean, default=False)


class Task(Base, TimeStampMixin):
    __tablename__ = 'tasks'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    description = Column(String(1024))
    deadline = Column(DateTime)
    status_id = Column(Integer, ForeignKey('task_statuses.id', ondelete="RESTRICT"))

    tags = relationship("Tag", secondary=task_tags, back_populates="tasks", lazy="selectin")
    users = relationship("User", secondary=user_tasks, back_populates="tasks", lazy="selectin")

