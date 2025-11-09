import uuid
from typing import Optional

from pydantic import BaseModel, Field, EmailStr, field_validator

from schemas.base import validate_hex_color, TimeStampSchema
from schemas.user import UserMinRead


class LeadMove(BaseModel):
    lead_id: int = Field(ge=1)
    status_id: int = Field(ge=1)


class LeadStatusBase(BaseModel):
    name: str = Field(max_length=255)
    hex: str = Field(max_length=7, min_length=4)

    @field_validator("hex")
    @classmethod
    def validate_hex(cls, v):
        return validate_hex_color(v)


class LeadStatusCreate(LeadStatusBase):
    pass


class LeadStatusUpdate(LeadStatusBase):
    pass


class LeadStatusRead(LeadStatusBase):
    id: int
    level: int
    can_delete: bool
    can_edit: bool


class LeadStatusMove(BaseModel):
    status_id: int = Field(ge=1)
    new_position: int = Field(ge=1)


class LeadCommentBase(BaseModel):
    comment: str = Field(min_length=2, max_length=2048)


class LeadCommentCreate(LeadCommentBase):
    pass


class LeadCommentUpdate(LeadCommentBase):
    pass


class LeadCommentRead(LeadCommentBase, TimeStampSchema):
    id: int
    lead_id: int
    user_id: Optional[int] = None

    user: UserMinRead | None = None

    model_config = {
        "from_attributes": True
    }


class LeadBase(BaseModel):
    full_name: str = Field(max_length=512)
    email: EmailStr
    phone: str = Field(max_length=20)
    company_name: str = Field(max_length=512)
    company_info: str = Field(max_length=2048)
    target_id: Optional[uuid.UUID] = None


class LeadCreate(LeadBase):
    pass


class LeadUpdate(LeadBase):
    status_id: int = Field(ge=1)


class LeadUpdateStatus(BaseModel):
    status_id: int = Field(ge=1)


class LeadRead(LeadBase, TimeStampSchema):
    id: int
    status_id: Optional[int]

    comments: list[LeadCommentRead] = []
    status: Optional[LeadStatusRead] = None

    model_config = {
        "from_attributes": True
    }


class LeadFileRead(BaseModel):
    id: uuid.UUID
    filename: str
    url: str

