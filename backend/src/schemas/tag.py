from pydantic import BaseModel


class TagRequest(BaseModel):
    name: str
    hex: str

class TagResponse(BaseModel):
    id: int
    name: str
    hex: str
