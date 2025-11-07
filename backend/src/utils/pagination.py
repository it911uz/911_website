from typing import Optional

from fastapi_pagination import Params


class LargeParams(Params):
    page: Optional[int] = None
    size: Optional[int] = None
