from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool
from alembic import context

# Alembic config object
config = context.config

# Логирование
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

from core.models import Base
from company.models import Company, CompanyContact, CompanyComment, Subscription, Payment
from clicks.models import Click
from lead.models import Lead, LeadStatus, LeadFile, LeadComment
from service.models import Service
from tag.models import Tag
from target.models import TargetCompany
from task.models import Task, TaskStatus, TaskFiles, TaskComment, user_tasks, task_tags
from user.models import User
from role.models import Role, role_permission, Permission

target_metadata = Base.metadata

from core.settings import DATABASE_URL


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
