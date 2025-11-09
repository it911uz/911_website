from sqlalchemy import Column, String, BigInteger, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from models.base import Base
from models.mixins import TimeStampMixin
from models.tasks import user_tasks


class User(Base, TimeStampMixin):
    __tablename__ = 'users'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    full_name = Column(String(512), nullable=False)
    username = Column(String(320), unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_superuser = Column(Boolean, nullable=False, default=False)
    role_id = Column(BigInteger, ForeignKey('roles.id', ondelete="SET NULL"), nullable=True)

    tasks = relationship("Task", secondary=user_tasks, back_populates="users")
    role = relationship("Role", back_populates="users", lazy="selectin")
    lead_comments = relationship("LeadComment", back_populates="user", lazy="selectin")