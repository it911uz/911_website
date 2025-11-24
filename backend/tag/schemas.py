from pydantic import BaseModel, Field, field_validator

from core.schemas import validate_hex_color


class TagBase(BaseModel):
    name: str = Field(max_length=255)
    hex: str = Field(max_length=7)

    @field_validator("hex")
    @classmethod
    def validate_hex(cls, v):
        return validate_hex_color(v)


class TagCreate(TagBase):
    pass


class TagUpdate(TagBase):
    pass


class TagRead(TagBase):
    id: int
