import json
from typing import Union

import boto3

import redis.asyncio as redis

from fastapi import UploadFile
from fastapi_filter.contrib.sqlalchemy import Filter
from fastapi_pagination import Params

from core.settings import AWS_S3_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, BUCKET_NAME, REDIS_URL


class S3Service:
    def __init__(self):
        self.client = boto3.client(
            's3',
            region_name=AWS_S3_REGION,
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        )
        self.bucket = BUCKET_NAME
        self.region = AWS_S3_REGION

    async def upload_file(
            self,
            file: UploadFile,
            key: str
    ):
        self.client.upload_fileobj(
            file.file,
            self.bucket,
            key
        )

    def get_presigned_url(
            self,
            key: str,
    ) -> str:
        return self.client.generate_presigned_url(
            "get_object",
            Params={"Bucket": self.bucket, "Key": key},
            ExpiresIn=3600,
        )

    async def delete_file(self, key: str):
        self.client.delete_object(
            Bucket=self.bucket,
            Key=key
        )


class RedisService:
    def __init__(self):
        self.__client = redis.from_url(
            url=REDIS_URL,
            decode_responses=True,
        )

    def key(
            self,
            entity: str,
            obj_id: Union[str, int] | None = None,
            filters: Filter | None = None,
            params: Params | None = None,
    ) -> str:
        key = entity
        if obj_id:
            key += f":{obj_id}"
        if filters is not None:
            key += f":{hash(str(filters))}"
        if params is not None:
            key += f":{hash(str(params))}"
        return key

    async def set(
            self,
            key: str,
            obj: Union[dict, list]
    ):
        await self.__client.set(
            key,
            json.dumps(obj, default=str),
            ex=80
        )

    async def get(
            self,
            key: str
    ):
        data = await self.__client.get(key)
        return json.loads(data) if data else None

    async def delete(
            self,
            entity: str
    ):
        await self.__client.delete(f"{entity}:*")

