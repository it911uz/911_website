from decimal import Decimal

from pydantic import BaseModel, Field


class ServiceBase(BaseModel):
    name: str = Field(max_length=255)
    description: str = Field(max_length=1024)
    price: Decimal
    is_subscription: bool


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(ServiceBase):
    pass


class ServiceRead(ServiceBase):
    id: int

    model_config = {
        "from_attributes": True
    }
