from sqlalchemy import Column, Integer, String, ForeignKey, Numeric, Date, Boolean

from models.base import Base
from models.mixins import TimeStampMixin


class Company(Base, TimeStampMixin):
    __tablename__ = 'companies'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    info = Column(String(1024), nullable=False)
    status = Column(String(20), nullable=False)
    phone_number = Column(String(25), nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)


class CompanyContact(Base):
    __tablename__ = 'company_contacts'
    id = Column(Integer, primary_key=True, autoincrement=True)
    company_id = Column(Integer, ForeignKey('companies.id', ondelete='CASCADE'))
    full_name = Column(String(512), nullable=False)
    phone_number = Column(String(25), nullable=False)
    email = Column(String(320), nullable=False)
    relation = Column(String(255), nullable=False)


class Subscription(Base, TimeStampMixin):
    __tablename__ = 'subscriptions'
    id = Column(Integer, primary_key=True, autoincrement=True)
    company_id = Column(Integer, ForeignKey('companies.id', ondelete='SET NULL'), nullable=True)
    service_id = Column(Integer, ForeignKey('services.id', ondelete='SET NULL'), nullable=True)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=True)
    payment_type = Column(String(20), nullable=False)
    price = Column(Numeric(precision=20, scale=2), nullable=False)
    next_payment_due = Column(Date, nullable=True)


class Payment(Base, TimeStampMixin):
    __tablename__ = 'payments'
    id = Column(Integer, primary_key=True, autoincrement=True)
    subscription_id = Column(Integer, ForeignKey('subscriptions.id', ondelete='SET NULL'), nullable=True)
    amount = Column(Numeric(precision=20, scale=2), nullable=False)
    status = Column(String(20), default="pending", nullable=False)


class CompanyComment(Base, TimeStampMixin):
    __tablename__ = 'company_comments'
    id = Column(Integer, primary_key=True, autoincrement=True)
    company_id = Column(Integer, ForeignKey('companies.id', ondelete='CASCADE'))
    comment = Column(String(1024))
