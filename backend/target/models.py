import uuid

from sqlalchemy import Column, String, UUID, Boolean
from sqlalchemy.orm import relationship

from core.mixins import TimeStampMixin
from core.models import Base


class TargetCompany(Base, TimeStampMixin):
    __tablename__ = 'target_companies'
    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    name = Column(String(512), nullable=False)
    is_active = Column(Boolean, default=True)

    leads = relationship("Lead", back_populates="target_company", lazy="selectin")