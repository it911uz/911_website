from datetime import datetime

from pydantic import BaseModel, Field

from schemas.tag import TagResponse
from schemas.user import UserMinRead


class TaskStatusRequest(BaseModel):
    name: str = Field(max_length=255)
    is_completed: bool = Field(default=False)


class TaskStatusResponse(TaskStatusRequest):
    id: int

    model_config = {
        "from_attributes": True
    }


class TaskStatusListResponse(BaseModel):
    data: list[TaskStatusResponse]
    pagination: None


class TaskRequest(BaseModel):
    name: str = Field(max_length=255)
    description: str = Field(max_length=1024)
    deadline: datetime
    status_id: int
    tags: list[int] = None
    users: list[int]


class TaskStatusChangeRequest(BaseModel):
    status_id: int


class TaskResponse(BaseModel):
    id: int
    name: str = Field(max_length=255)
    description: str = Field(max_length=1024)
    deadline: datetime
    status_id: int
    users: list[UserMinRead] = []
    tags: list[TagResponse] = []

    model_config = {
        "from_attributes": True
    }


class TaskListResponse(BaseModel):
    data: list[TaskResponse]
    pagination: None
