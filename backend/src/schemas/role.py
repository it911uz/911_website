from typing import Optional

from pydantic import BaseModel, Field


class PermissionRead(BaseModel):
    id: int
    name: str
    codename: str

    model_config = {
        "from_attributes": True
    }


class RoleBase(BaseModel):
    name: str = Field(max_length=255)


class RoleCreate(RoleBase):
    pass


class RoleUpdate(RoleBase):
    pass


class RoleRead(RoleBase):
    id: int
    permissions: list[PermissionRead] = []

    model_config = {
        "from_attributes": True
    }
