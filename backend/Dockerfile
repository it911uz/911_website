# ==== Базовый образ ====
FROM python:3.12-slim AS base

# ==== Переменные окружения ====
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# ==== Рабочая директория ====
WORKDIR /app

# ==== Установка зависимостей ====
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ==== Копирование исходников ====
COPY . .

# ==== Команда по умолчанию ====
# Выполняет миграции Alembic, затем запускает main.py
CMD alembic -c src/alembic.ini upgrade head && python src/main.py
