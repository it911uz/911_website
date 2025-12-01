from sqlalchemy import Column, String, BigInteger, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from core.models import Base
from core.mixins import TimeStampMixin
from task.models import user_tasks, Task

class User(Base, TimeStampMixin):
    __tablename__ = 'users'
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    full_name = Column(String(512), nullable=False)
    username = Column(String(320), unique=True, nullable=False)
    phone_number = Column(String(25), nullable=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_superuser = Column(Boolean, nullable=False, default=False)
    role_id = Column(BigInteger, ForeignKey('roles.id', ondelete="SET NULL"), nullable=True)

    tasks = relationship(Task, secondary=user_tasks, back_populates="users", lazy="selectin")
    role = relationship("Role", back_populates="users", lazy="selectin")
    lead_comments = relationship("LeadComment", back_populates="user", lazy="selectin")