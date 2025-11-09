import re
from datetime import datetime

from pydantic import BaseModel

HEX_COLOR_PATTERN = re.compile(r'^#(?:[0-9a-fA-F]{3}){1,2}$')


def validate_hex_color(value):
    if not HEX_COLOR_PATTERN.fullmatch(value):
        raise ValueError("Invalid HEX color format (expected #RGB or #RRGGBB)")
    return value


class TimeStampSchema(BaseModel):
    created_at: datetime
    updated_at: datetime
