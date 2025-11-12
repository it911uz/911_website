from logging.config import fileConfig
import os

from sqlalchemy import engine_from_config, pool
from alembic import context

# Alembic config object
config = context.config

# Логирование
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

from src.models.base import Base
# from models.company import Company, CompanyContact, CompanyComment, Subscription, Payment
# from models.click import Click
# from models.lead import Lead, LeadComment, LeadStatus, LeadFile
# from models.service import Service
# from models.target import TargetCompany
# from models.tasks import Task, TaskStatus, task_tags, user_tasks
# from models.tag import Tag
# from models.telegram import TelegramUser
# from models.role import Role, Permission, role_permission
# from models.user import User

target_metadata = Base.metadata

from src.configs import DATABASE_URL


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    context.configure(
        url=DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        {
            "sqlalchemy.url": DATABASE_URL
        },
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
