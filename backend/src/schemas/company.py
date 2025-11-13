from datetime import datetime, date
from decimal import Decimal
from enum import Enum

from pydantic import BaseModel, Field, EmailStr

from schemas.service import ServiceRead


class CompanyCommentBase(BaseModel):
    comment: str = Field(max_length=1024)


class CompanyCommentCreate(CompanyCommentBase):
    pass


class CompanyCommentUpdate(CompanyCommentBase):
    pass


class CompanyCommentRead(CompanyCommentBase):
    id: int

    model_config = {
        "from_attributes": True
    }


class PaymentType(str, Enum):
    one_time = 'one_time'
    monthly = 'monthly'
    annually = 'annually'


class SubscriptionBase(BaseModel):
    service_id: int
    start_date: date
    end_date: date | None = None
    payment_type: PaymentType
    price: Decimal
    next_payment_due: date | None = None


class SubscriptionCreate(SubscriptionBase):
    pass


class SubscriptionUpdate(SubscriptionBase):
    pass


class SubscriptionRead(SubscriptionBase):
    id: int

    service: ServiceRead

    model_config = {
        "from_attributes": True
    }


class PaymentStatus(str, Enum):
    cancelled = 'cancelled'
    pending = 'pending'
    succeeded = 'succeeded'


class PaymentBase(BaseModel):
    amount: Decimal
    status: PaymentStatus


class PaymentCreate(PaymentBase):
    pass


class PaymentUpdate(PaymentBase):
    pass


class PaymentRead(PaymentBase):
    id: int

    model_config = {
        "from_attributes": True
    }


class CompanyContactBase(BaseModel):
    full_name: str = Field(max_length=512)
    phone_number: str = Field(max_length=25)
    email: EmailStr
    relation: str = Field(max_length=255)


class CompanyContactCreate(CompanyContactBase):
    pass


class CompanyContactUpdate(CompanyContactBase):
    pass


class CompanyContactRead(CompanyContactBase):
    id: int

    model_config = {
        "from_attributes": True
    }


class CompanyStatus(str, Enum):
    active = 'active'
    inactive = 'inactive'
    pending = 'pending'


class CompanyBase(BaseModel):
    name: str = Field(max_length=255)
    info: str = Field(max_length=1024)
    status: CompanyStatus
    phone_number: str = Field(max_length=25)


class CompanyCreate(CompanyBase):
    pass


class CompanyUpdate(CompanyBase):
    pass


class CompanyRead(CompanyBase):
    id: int

    contacts: list[CompanyContactRead] = []

    model_config = {
        "from_attributes": True
    }
