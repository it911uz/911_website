from redis import asyncio as aioredis
import json

from configs import REDIS_URL


class RedisCache:
    def __init__(self, url: str):
        self._url = url
        self._redis = None

    async def init(self):
        self._redis = await aioredis.from_url(self._url, decode_responses=True)

    async def get(self, key: str):
        data = await self._redis.get(key)
        return json.loads(data) if data else None

    async def set(self, key: str, value, expire: int = 300):
        await self._redis.set(key, json.dumps(value, default=str), ex=expire)

    async def delete(self, key: str):
        await self._redis.delete(key)

    async def delete_pattern(self, pattern: str):
        keys = await self._redis.keys(pattern)
        if keys:
            await self._redis.delete(*keys)
    async def close(self):
        await self._redis.close()


redis_cache = RedisCache(REDIS_URL)
