from contextlib import asynccontextmanager

import uvicorn

from fastapi import FastAPI
from starlette import status

from starlette.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware

from db.seeds.user import create_user
from routers.auth import router as auth_router
from routers.click import router as click_router
from routers.deal import router as deal_router
from routers.lead import router as lead_router
from routers.target import router as target_router
from routers.task import router as task_router
from routers.telegram import router as telegram_router
from routers.user import router as user_router
from schemas.exceptions import ExceptionResponse



@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_user()
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
@app.get("/")
async def health():
    return {"status": "ok"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
)

app.add_middleware(GZipMiddleware, minimum_size=1000)

app.include_router(auth_router)
app.include_router(click_router)
app.include_router(deal_router)
app.include_router(lead_router)
app.include_router(target_router)
app.include_router(task_router)
app.include_router(telegram_router)
app.include_router(user_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
