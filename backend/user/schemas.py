from pydantic import BaseModel, Field, field_validator, EmailStr

from auth.schemas import validate_password_strength
from role.schemas import RoleRead, RoleMinRead


class UserBase(BaseModel):
    full_name: str = Field(max_length=512)
    username: str = Field(max_length=320)
    email: EmailStr
    phone_number: str | None = Field(default=None, max_length=25)
    role_id: int = Field(ge=1)


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
    is_superuser: bool
    role: RoleMinRead | None = None

    model_config = {
        "from_attributes": True
    }


class UserRead(UserBase):
    id: int
    is_superuser: bool
    role: RoleRead | None = None

    model_config = {
        "from_attributes": True
    }


