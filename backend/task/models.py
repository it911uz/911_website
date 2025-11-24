from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Table, UUID
from sqlalchemy.orm import relationship

from core.mixins import TimeStampMixin
from core.models import Base
from tag.models import Tag

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
    hex = Column(String(7))
    order = Column(Integer)
    is_completed = Column(Boolean, default=False)


class Task(Base, TimeStampMixin):
    __tablename__ = 'tasks'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    description = Column(String(1024))
    deadline = Column(DateTime)
    status_id = Column(Integer, ForeignKey('task_statuses.id', ondelete="RESTRICT"))

    status = relationship(
        TaskStatus,
        backref="tasks",
        lazy="selectin"
    )
    tags = relationship(Tag, secondary=task_tags, backref="tasks", lazy="selectin")
    users = relationship("User", secondary=user_tasks, back_populates="tasks", lazy="selectin")
    comments = relationship(
        "TaskComment",
        back_populates="task",
        lazy="selectin"
    )
    files = relationship(
        "TaskFiles",
        back_populates="task",
        lazy="selectin"
    )


class TaskComment(Base, TimeStampMixin):
    __tablename__ = "task_comments"
    id = Column(Integer, primary_key=True, autoincrement=True)
    task_id = Column(Integer, ForeignKey("tasks.id", ondelete="CASCADE"))
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    comment = Column(String(2048))

    task = relationship(
        Task,
        back_populates="comments",
        lazy="selectin"
    )
    user = relationship(
        "User",
        backref="task_comments",
        lazy="selectin"
    )


class TaskFiles(Base):
    __tablename__ = "task_files"
    id = Column(UUID, primary_key=True, nullable=False, index=True)
    task_id = Column(Integer, ForeignKey("tasks.id", ondelete="CASCADE"))
    filename = Column(String(512), nullable=False)
    key = Column(String, nullable=False)

    task = relationship(
        Task,
        back_populates="files",
        lazy="selectin"
    )
