from sqlalchemy import Column, Integer, String, ForeignKey, UUID, Boolean
from sqlalchemy.orm import relationship

from core.mixins import TimeStampMixin
from core.models import Base
from target.models import TargetCompany
from user.models import User


class LeadStatus(Base):
    __tablename__ = 'lead_statuses'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False, unique=True)
    hex = Column(String(7))
    level = Column(Integer)
    can_delete = Column(Boolean, nullable=False, default=True)
    can_edit = Column(Boolean, nullable=False, default=True)

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

    target_company = relationship(TargetCompany, back_populates="leads", lazy="selectin")
    status = relationship(LeadStatus, back_populates="leads", lazy="selectin")
    comments = relationship("LeadComment", back_populates="lead", lazy="selectin")



class LeadComment(Base, TimeStampMixin):
    __tablename__ = 'lead_comments'
    id = Column(Integer, primary_key=True, autoincrement=True)
    lead_id = Column(Integer, ForeignKey('leads.id', ondelete='CASCADE'))
    user_id = Column(Integer, ForeignKey('users.id', ondelete='SET NULL'), nullable=True)
    comment = Column(String(2048), nullable=False)

    lead = relationship(Lead, back_populates="comments", lazy="selectin")
    user = relationship(User, back_populates="lead_comments", lazy="selectin")

class LeadFile(Base):
    __tablename__ = 'lead_files'
    id = Column(UUID, primary_key=True, nullable=False, index=True)
    lead_id = Column(Integer, ForeignKey('leads.id', ondelete='CASCADE'), nullable=False)
    filename = Column(String(512), nullable=False)
    key = Column(String, nullable=False)
