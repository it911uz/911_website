import uuid

from pydantic import BaseModel, Field

from core.schemas import TimeStampSchema


class TargetCompanyBase(BaseModel):
    name: str = Field(min_length=3, max_length=256)


class TargetCompanyCreate(TargetCompanyBase):
    pass


class TargetCompanyUpdate(TargetCompanyBase):
    is_active: bool


class TargetCompanyRead(TargetCompanyBase, TimeStampSchema):
    id: uuid.UUID
    url: str = None
    is_active: bool
    clicks_count: int = 0
    leads_count: int = 0

    model_config = {
        "from_attributes": True
    }
