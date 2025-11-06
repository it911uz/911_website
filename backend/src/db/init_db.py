from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import roles

from db.session import async_session
from models.role import Permission, Role
from models.lead import  LeadStatus
from models.user import  User
from models.base import Base
from repository.user_repo import UserRepository
from services.password_service import PasswordService


async def init_permissions(session: AsyncSession):
    actions = ["create", "view", "update", "delete"]

    existing_permissions = (await session.execute(
        select(Permission.codename)
    )).scalars().all()

    permissions = []

    tables = Base.metadata.tables.keys()
    for table in tables:
        for action in actions:
            codename = f"{action}_{table}"
            if codename not in existing_permissions:
                permissions.append(Permission(
                    codename=codename,
                    name=f"{action.capitalize()} {table}"
                ))
    if permissions:
        session.add_all(permissions)
        await session.flush()
    return permissions


async def create_status(session: AsyncSession):
    existing_lead_statuses = (await session.execute(
        select(LeadStatus.id)
    )).scalars().all()

    new_statuses = []

    statuses = {1: "Новый", 2: "В Процессе", 3: "Обработанный"}
    for status_id, status_name in statuses.items():
        if status_id not in existing_lead_statuses:
            new_statuses.append(
                LeadStatus(
                    id=status_id,
                    name=status_name,
                    hex="#ffffff",
                    level=status_id
                )
            )
    if new_statuses:
        session.add_all(new_statuses)
        await session.flush()
    return new_statuses


async def create_default_roles(session: AsyncSession):
    existing_roles = (await session.execute(
        select(Role.name)
    )).scalars().all()

    default_roles = [
        {
            "id": 1,
            "name": "Новый Пользователь"
        },
        {
            "id": 2,
            "name": "Супер Пользователь"
        },
    ]
    new_roles = []
    for role in default_roles:
        if role["name"] not in existing_roles:
            new_roles.append(Role(
                id=role["id"],
                name=role["name"],
            ))
    if new_roles:
        session.add_all(new_roles)
        await session.flush()
    return new_roles


async def create_superuser(session: AsyncSession):
    existing_superusers = (await session.execute(
        select(User.username).where(User.username == "admin")
    )).scalar_one_or_none()
    if not existing_superusers:
        repo = UserRepository(session, User)
        await repo.create(
            full_name="Admin",
            username="admin",
            hashed_password=PasswordService().hash_password("1234"),
            is_superuser=True,
            role_id=2,
            email="admin@it911.uz",
        )


async def init_db():
    async with async_session() as session:
        permissions = await init_permissions(session)
        print(f"{len(permissions)} permissions were created")
        # statuses = await create_status(session)
        # print(f"{len(statuses)} lead status were created")
        roles = await create_default_roles(session)
        print(f"{len(roles)} default roles were created")
        await create_superuser(session)
        await session.commit()




