import uuid
from typing import Optional

from pydantic import BaseModel, Field, EmailStr


class LeadMove(BaseModel):
    lead_id: int
    status_id: int


class LeadStatusBase(BaseModel):
    name: str = Field(max_length=255)
    hex: str


class LeadStatusCreate(LeadStatusBase):
    pass


class LeadStatusUpdate(LeadStatusBase):
    pass


class LeadStatusRead(LeadStatusBase):
    id: int
    level: int


class LeadStatusMove(BaseModel):
    status_id: int
    new_position: int


class LeadCommentBase(BaseModel):
    comment: str = Field(max_length=2048)


class LeadCommentCreate(LeadCommentBase):
    pass


class LeadCommentUpdate(LeadCommentBase):
    pass


class LeadCommentRead(LeadCommentBase):
    id: int
    lead_id: int
    user_id: int

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
    status_id: int


class LeadUpdateStatus(BaseModel):
    status_id: int


class LeadRead(LeadBase):
    id: int
    status_id: Optional[int]

    comments: list[LeadCommentRead] = []
    status: Optional[LeadStatusRead] = None

    model_config = {
        "from_attributes": True
    }
