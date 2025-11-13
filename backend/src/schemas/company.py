from enum import Enum

from pydantic import BaseModel, Field, PositiveInt


# class CompanyContactBase(BaseModel):
#     pass


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
