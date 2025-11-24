import boto3
from fastapi import UploadFile

from core.settings import AWS_S3_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, BUCKET_NAME


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
    )-> str:
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