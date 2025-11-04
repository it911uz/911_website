from pydantic import BaseModel, Field, field_validator, EmailStr

from schemas.auth import validate_password_strength
from schemas.role import RoleRead, RoleMinRead


class UserBase(BaseModel):
    full_name: str = Field(max_length=512)
    username: str = Field(max_length=320)
    email: EmailStr
    is_superuser: bool
    role_id: int


class UserCreate(UserBase):
    password: str

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str) -> str:
        return validate_password_strength(value)


class UserUpdate(UserBase):
    pass


class UserMinRead(UserBase):
    id: int

    role: RoleMinRead

    model_config = {
        "from_attributes": True
    }


class UserRead(UserBase):
    id: int

    role: RoleRead

    model_config = {
        "from_attributes": True
    }


