import os

import pytz

from dotenv import load_dotenv

import redis.asyncio as aioredis

from functools import lru_cache

load_dotenv()

TIMEZONE = pytz.timezone('Asia/Tashkent')

DATABASE_URL = os.getenv("DATABASE_URL")
ASYNC_DATABASE_URL = os.getenv("ASYNC_DATABASE_URL")

REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = int(os.getenv("REDIS_PORT"))

SECRET_KEY = os.getenv("SECRET_KEY")
ACCESS_TIME = os.getenv("ACCESS_TIME")
REFRESH_TIME = os.getenv("REFRESH_TIME")


BOT_SECRET = os.getenv("BOT_SECRET")

@lru_cache
def get_redis() -> aioredis.Redis:
    return aioredis.Redis(
        host=REDIS_HOST,
        port=REDIS_PORT,
        db=0,
        decode_responses=True,
    )
