from sqlalchemy import Column, Integer, String, ForeignKey, Numeric, Date, Boolean
from sqlalchemy.orm import relationship

from core.mixins import TimeStampMixin
from core.models import Base


class Company(Base, TimeStampMixin):
    __tablename__ = 'companies'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    info = Column(String(1024), nullable=False)
    status = Column(String(20), nullable=False)
    phone_number = Column(String(25), nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)

    contacts = relationship(
        "CompanyContact",
        back_populates="company",
        lazy="selectin"
    )

    subscriptions = relationship(
        "Subscription",
        back_populates="company",
        lazy="selectin"
    )

    comments = relationship(
        "CompanyComment",
        back_populates="company",
        lazy="selectin"
    )


class CompanyContact(Base):
    __tablename__ = 'company_contacts'
    id = Column(Integer, primary_key=True, autoincrement=True)
    company_id = Column(Integer, ForeignKey('companies.id', ondelete='CASCADE'))
    full_name = Column(String(512), nullable=False)
    phone_number = Column(String(25), nullable=False)
    email = Column(String(320), nullable=False)
    relation = Column(String(255), nullable=False)

    company = relationship(
        "Company",
        back_populates="contacts",
        lazy="selectin"
    )


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

    company = relationship(
        "Company",
        back_populates="subscriptions",
        lazy="selectin"
    )

    payments = relationship(
        "Payment",
        back_populates="subscription",
        lazy="selectin"
    )

    service = relationship(
        "Service",
        back_populates="subscriptions",
        lazy="selectin"
    )

class Payment(Base, TimeStampMixin):
    __tablename__ = 'payments'
    id = Column(Integer, primary_key=True, autoincrement=True)
    subscription_id = Column(Integer, ForeignKey('subscriptions.id', ondelete='SET NULL'), nullable=True)
    amount = Column(Numeric(precision=20, scale=2), nullable=False)
    status = Column(String(20), default="pending", nullable=False)

    subscription = relationship(
        "Subscription",
        back_populates="payments",
        lazy="selectin"
    )


class CompanyComment(Base, TimeStampMixin):
    __tablename__ = 'company_comments'
    id = Column(Integer, primary_key=True, autoincrement=True)
    company_id = Column(Integer, ForeignKey('companies.id', ondelete='CASCADE'))
    comment = Column(String(1024))

    company = relationship(
        "Company",
        back_populates="comments",
        lazy="selectin"
    )
