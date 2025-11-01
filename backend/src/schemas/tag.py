from pydantic import BaseModel


class TagResponse(BaseModel):
    name: str
    hex: str
