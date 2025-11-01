from pydantic import BaseModel


class TagRequest(BaseModel):
    name: str
    hex: str

class TagResponse(BaseModel):
    name: str
    hex: str
