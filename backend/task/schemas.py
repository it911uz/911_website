import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, field_validator

from core.schemas import validate_hex_color, TimeStampSchema
from tag.schemas import TagRead
from user.schemas import UserMinRead


class TaskCommentBase(BaseModel):
    comment: str = Field(max_length=2048)


class TaskCommentCreate(TaskCommentBase):
    pass


class TaskCommentUpdate(TaskCommentBase):
    pass


class TaskCommentRead(TaskCommentBase, TimeStampSchema):
    id: int

    user_id: int
    task_id: int

    user: UserMinRead | None = None

    model_config = {
        "from_attributes": True
    }

class TaskFileBase(BaseModel):
    id: uuid.UUID
    filename: str
class TaskFileMinRead(TaskFileBase):
    pass


class TaskFileRead(TaskFileMinRead):
    url: str


class TaskStatusBase(BaseModel):
    name: str = Field(max_length=255)
    hex: str = Field(max_length=7)
    is_completed: bool = Field(default=False)

    @field_validator("hex")
    @classmethod
    def validate_hex(cls, v):
        return validate_hex_color(v)


class TaskStatusCreate(TaskStatusBase):
    pass


class TaskStatusUpdate(TaskStatusBase):
    pass


class TaskStatusRead(TaskStatusBase):
    id: int
    order: int

    model_config = {
        "from_attributes": True
    }


class TaskBase(BaseModel):
    name: str = Field(max_length=255)
    description: str = Field(max_length=1024)
    deadline: datetime


class TaskCreate(TaskBase):
    status_id: int
    tag_ids: Optional[list[int]] = []
    user_ids: Optional[list[int]] = []


class TaskUpdate(TaskBase):
    tag_ids: Optional[list[int]] = []
    user_ids: Optional[list[int]] = []


class TaskRead(TaskBase, TimeStampSchema):
    id: int
    status_id: int

    status: TaskStatusRead

    tags: list[TagRead] = []
    users: list[UserMinRead] = []
    comments: list[TaskCommentRead] = []
    files: list[TaskFileMinRead] = []

    model_config = {
        "from_attributes": True
    }


class TaskMove(BaseModel):
    task_id: int
    status_id: int


class TaskStatusMove(BaseModel):
    status_id: int
    new_position: int
