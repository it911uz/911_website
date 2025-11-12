#!/bin/bash

# === Настройки ===
BACKUP_DIR="/opt/it911/backups"
DATE=$(date +%F_%H-%M-%S)
FILENAME="db_backup_$DATE.sql.gz"
LOGFILE="/opt/it911/backup.log"

# === Загружаем переменные из .env ===
set -a
source /opt/it911/.env
set +a

# === Проверяем наличие нужных переменных ===
if [[ -z "$AWS_ACCESS_KEY_ID" || -z "$AWS_SECRET_ACCESS_KEY" || -z "$BUCKET_NAME" ]]; then
  echo "[$(date)] ❌ AWS переменные не заданы!" >> "$LOGFILE"
  exit 1
fi

# === Создаём папку, если её нет ===
mkdir -p "$BACKUP_DIR"

echo "[$(date)] 🔄 Начало бэкапа..." >> "$LOGFILE"

# === Дамп базы PostgreSQL ===
docker exec postgres pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" | gzip > "$BACKUP_DIR/$FILENAME"

if [ $? -eq 0 ]; then
  echo "[$(date)] ✅ Бэкап успешно создан: $FILENAME" >> "$LOGFILE"
else
  echo "[$(date)] ❌ Ошибка при создании дампа!" >> "$LOGFILE"
  exit 1
fi

# === Загружаем в AWS S3 ===
AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
AWS_DEFAULT_REGION=$AWS_S3_REGION \
aws s3 cp "$BACKUP_DIR/$FILENAME" "s3://$BUCKET_NAME/$FILENAME" --storage-class STANDARD_IA

if [ $? -eq 0 ]; then
  echo "[$(date)] ☁️ Загружено в S3: s3://$BUCKET_NAME/$FILENAME" >> "$LOGFILE"
else
  echo "[$(date)] ❌ Ошибка при загрузке в S3!" >> "$LOGFILE"
  exit 1
fi

# === Удаляем старые локальные бэкапы ===
find "$BACKUP_DIR" -type f -name "*.gz" -mtime +7 -delete
echo "[$(date)] 🧹 Старые бэкапы удалены" >> "$LOGFILE"

echo "[$(date)] ✅ Бэкап завершён успешно" >> "$LOGFILE"
