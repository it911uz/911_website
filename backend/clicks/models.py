from sqlalchemy import Column, Integer, ForeignKey, UUID

from core.mixins import TimeStampMixin
from core.models import Base


class Click(Base, TimeStampMixin):
    __tablename__ = "clicks"
    id = Column(Integer, primary_key=True, autoincrement=True)
    target_id = Column(UUID, ForeignKey("target_companies.id", ondelete="CASCADE"))
