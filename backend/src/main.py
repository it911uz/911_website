from contextlib import asynccontextmanager

import uvicorn

from fastapi import FastAPI, Request
from fastapi_pagination import add_pagination
from starlette import status

from starlette.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from starlette.responses import JSONResponse

from db.init_db import init_db
from routers.auth import router as auth_router
from routers.click import router as click_router
from routers.role import router as role_router
from routers.lead import router as lead_router
from routers.lead_status import router as lead_status_router
from routers.lead_comment import router as lead_comment_router
from routers.lead_files import router as lead_files_router
from routers.target import router as target_router
from routers.task import router as task_router
from routers.user import router as user_router
from schemas.exceptions import ExceptionResponse
from utils.cache import redis_cache


@asynccontextmanager
async def lifespan(app: FastAPI):
    await redis_cache.init()
    await init_db()
    print("Сервер Запущен")
    yield
    print("Работа Завершилась")


app = FastAPI(
    title="IT 911 API",
    description="IT 911 BackEnd API",
    version="0.1",
    lifespan=lifespan,
    responses={
        status.HTTP_400_BAD_REQUEST: {"description": "Bad Request", "model": ExceptionResponse},
        status.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized", "model": ExceptionResponse},
        status.HTTP_403_FORBIDDEN: {"description": "Forbidden", "model": ExceptionResponse},
        status.HTTP_404_NOT_FOUND: {"description": "Not Found", "model": ExceptionResponse},
    }
)
add_pagination(app)


@app.get("/")
async def health():
    return {"status": "123145"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://app.it911.uz", "https://it911.uz", "http://localhost:3000", "http://nextjs-app:3000", "http://app.it911.uz", "http://it911.uz"],
    allow_credentials=True,
    allow_methods=["*"],  # важно: чтобы разрешить DELETE, PATCH, PUT и т.д.
    allow_headers=["*"],
)

app.add_middleware(GZipMiddleware, minimum_size=1000)

app.include_router(auth_router)
app.include_router(click_router)
app.include_router(role_router)
app.include_router(lead_router)
app.include_router(lead_comment_router)
app.include_router(lead_status_router)
app.include_router(lead_files_router)
app.include_router(target_router)
app.include_router(task_router)
app.include_router(user_router)
# app.include_router(telegram_route

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
