from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

# Alembic Config object
config = context.config

# Подключаем логирование
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Импорт таблиц для автогенерации миграций
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

# Метаданные проекта
target_metadata = Base.metadata

# ⚠️ Главное исправление — подгружаем правильный URL из настроек
from core.settings import DATABASE_URL

# 🔥 ПЕРЕЗАПИСЫВАЕМ sqlalchemy.url в alembic.ini корректным значением
# Это гарантирует, что Alembic НИКОГДА не использует "driver://user:pass@localhost/dbname"
config.set_main_option("sqlalchemy.url", DATABASE_URL)


def run_migrations_offline() -> None:
    """Запуск миграций в offline-режиме."""
    context.configure(
        url=DATABASE_URL,                   # используем правильный URL
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Запуск миграций в online-режиме."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),  # <-- берём обновлённый URL
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


# Запуск
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
