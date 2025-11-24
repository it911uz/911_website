#!/bin/sh
set -e

host="${POSTGRES_HOST:-postgres}"
user="${POSTGRES_USER:-postgres}"

echo "⏳ Waiting for Postgres ($host) to be ready..."

# ждём пока Postgres не ответит
until pg_isready -h "$host" -U "$user" > /dev/null 2>&1; do
  sleep 1
done

echo "✅ Postgres is ready, running migrations..."
alembic -c alembic.ini upgrade head

echo "🚀 Starting FastAPI app..."
python main.py
