from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi_pagination import add_pagination
from starlette.middleware.cors import CORSMiddleware

from core.init_db import init_db

from auth.router import router as auth_router
from clicks.router import router as click_router
from company.routers import router as company_router
from dashboard.router import router as dashboard_router
from lead.routers import router as lead_router, lead_status_router
from role.routers.role import router as role_router
from role.routers.permission import router as permission_router
from service.router import router as service_router
from tag.router import router as tag_router
from target.router import router as target_router
from task.routers import router as task_router, task_status_router
from user.router import router as user_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    print("Сервер Запущен")
    yield
    print("Работа Завершилась")


app = FastAPI(
    lifespan=lifespan,
)
add_pagination(app)
app.include_router(auth_router)
app.include_router(click_router)
app.include_router(company_router)
app.include_router(dashboard_router)
app.include_router(lead_router)
app.include_router(lead_status_router)
app.include_router(role_router)
app.include_router(permission_router)
app.include_router(service_router)
app.include_router(tag_router)
app.include_router(target_router)
app.include_router(task_router)
app.include_router(task_status_router)
app.include_router(user_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    allow_methods=["*"],
)
