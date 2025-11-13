from typing import Optional

from fastapi_pagination import Params
from pydantic import root_validator, model_validator, ValidationError

from exceptions import BadRequest


class LargeParams(Params):
    page: Optional[int] = None
    size: Optional[int] = None

    @model_validator(mode="after")
    def check_params(self):
        if self.page and not self.size:
            raise BadRequest("Page and size are required.")
        if self.size and not self.page:
            raise BadRequest("Page and size are required.")
        return self

