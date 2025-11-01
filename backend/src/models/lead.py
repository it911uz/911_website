from sqlalchemy import Column, Integer, String, Enum, ForeignKey, UUID
from sqlalchemy.orm import relationship

from models.base import Base
from models.mixins import TimeStampMixin


class LeadStatus(Base, TimeStampMixin):
    __tablename__ = 'lead_statuses'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False, unique=True)
    hex = Column(String(7))
    level = Column(Integer, unique=True)
    leads = relationship("Lead", back_populates="status", lazy="selectin")


class Lead(Base, TimeStampMixin):
    __tablename__ = 'leads'
    id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String(512), nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String(20), nullable=False)
    status_id = Column(Integer, ForeignKey('lead_statuses.id', ondelete='SET NULL'), nullable=True, default=1)
    company_name = Column(String(512), nullable=False)
    company_info = Column(String(2048), nullable=False)
    target_id = Column(UUID, ForeignKey("target_companies.id", ondelete="SET NULL"), nullable=True, index=True)

    target_company = relationship("TargetCompany", back_populates="leads", lazy="selectin")
    status = relationship("LeadStatus", back_populates="leads", lazy="selectin")
    comments = relationship("LeadComment", back_populates="lead", lazy="selectin")


class LeadComment(Base, TimeStampMixin):
    __tablename__ = 'lead_comments'
    id = Column(Integer, primary_key=True, autoincrement=True)
    lead_id = Column(Integer, ForeignKey('leads.id', ondelete='CASCADE'))
    user_id = Column(Integer, ForeignKey('users.id', ondelete='SET NULL'), nullable=True)
    comment = Column(String(2048), nullable=False)

    lead = relationship("Lead", back_populates="comments", lazy="selectin")
