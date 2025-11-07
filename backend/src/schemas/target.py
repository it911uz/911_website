import uuid

from pydantic import BaseModel, Field


class TargetCompanyBase(BaseModel):
    name: str = Field(min_length=3, max_length=256)


class TargetCompanyCreate(TargetCompanyBase):
    pass


class TargetCompanyUpdate(TargetCompanyBase):
    is_active: bool


class TargetCompanyRead(BaseModel):
    id: uuid.UUID
    name: str = Field(max_length=256)
    url: str = None
    is_active: bool
    clicks_count: int = 0
    leads_count: int = 0

    model_config = {
        "from_attributes": True
    }
