from enum import Enum

from datetime import datetime, date, timedelta, time
from typing import List, Dict

from sqlalchemy import select, func, update

from core.repository import BaseRepository
from lead.models import Lead, LeadComment, LeadStatus, LeadFile

class LeadPeriod(str, Enum):
    day = "day"
    week = "week"
    month = "month"
    year = "year"
class LeadRepository(BaseRepository):
    model = Lead

    async def get_leads_chart(
            self,
            period: LeadPeriod,
            start_date: date,
            end_date: date,
    ) -> dict:
        """
        Универсальная статистика лидов по периодам (day, week, month, year)
        с заполнением нулями.
        """

        trunc_unit = {
            LeadPeriod.day: "day",
            LeadPeriod.week: "week",
            LeadPeriod.month: "month",
            LeadPeriod.year: "year",
        }[period]

        # 1. Достаём агрегированные данные из БД
        stmt = (
            select(
                func.date_trunc(trunc_unit, Lead.created_at).label("bucket"),
                func.count(Lead.id).label("count"),
            )
            .where(
                Lead.created_at >= datetime.combine(start_date, time.min),
                Lead.created_at <= datetime.combine(end_date, time.max),
            )
            .group_by("bucket")
            .order_by("bucket")
        )

        result = await self.db.execute(stmt)
        rows = result.all()

        # Превращаем в dict: {bucket_date: count}
        counts: Dict[date, int] = {}
        for bucket, cnt in rows:
            # bucket — это datetime, приведём к date (первый день периода)
            bucket_date = bucket.date()
            counts[bucket_date] = cnt

        # 2. Генерируем все промежутки (включая пустые) и формируем categories + data
        categories: List[str] = []
        data: List[int] = []

        current = self._normalize_start(period, start_date)

        while current <= end_date:
            bucket_key = self._bucket_key(period, current)
            label = self._format_label(period, current, end_date)

            categories.append(label)
            data.append(counts.get(bucket_key, 0))

            current = self._add_step(period, current)

        return {
            "name": f"Лиды ({period.value})",
            "type": "column",
            "categories": categories,
            "data": data,
        }

    # ===== Хелперы для периодов =====

    @staticmethod
    def _normalize_start(period: LeadPeriod, start: date) -> date:
        """Приводим старт к началу периода (для week/month/year)."""
        if period == LeadPeriod.week:
            # начало недели (понедельник)
            return start - timedelta(days=start.weekday())
        if period == LeadPeriod.month:
            return date(start.year, start.month, 1)
        if period == LeadPeriod.year:
            return date(start.year, 1, 1)
        return start  # day

    @staticmethod
    def _add_step(period: LeadPeriod, current: date) -> date:
        """Шаг по периодам."""
        if period == LeadPeriod.day:
            return current + timedelta(days=1)

        if period == LeadPeriod.week:
            return current + timedelta(days=7)

        if period == LeadPeriod.month:
            # прибавляем месяц
            year = current.year + (current.month // 12)
            month = 1 if current.month == 12 else current.month + 1
            return date(year, month, 1)

        if period == LeadPeriod.year:
            return date(current.year + 1, 1, 1)

        return current

    @staticmethod
    def _bucket_key(period: LeadPeriod, current: date) -> date:
        """
        Ключ, который должен совпасть с date_trunc(...) в PostgreSQL.
        Для day/week/month/year — это просто текущая дата, приведённая
        к первому дню периода.
        """
        if period == LeadPeriod.week:
            # date_trunc('week', ...) даёт понедельник
            return current - timedelta(days=current.weekday())
        if period == LeadPeriod.month:
            return date(current.year, current.month, 1)
        if period == LeadPeriod.year:
            return date(current.year, 1, 1)
        return current

    @staticmethod
    def _format_label(period: LeadPeriod, current: date, end_date: date) -> str:
        """
        Красивые подписи:
        - day:  "18.11"
        - week: "18.11–24.11"
        - month: "09.2025"
        - year: "2025"
        """
        if period == LeadPeriod.day:
            return current.strftime("%d.%m")

        if period == LeadPeriod.week:
            week_end = current + timedelta(days=6)
            # ограничим конец диапазона верхней границей
            if week_end > end_date:
                week_end = end_date
            return f"{current.strftime('%d.%m')}–{week_end.strftime('%d.%m')}"

        if period == LeadPeriod.month:
            return current.strftime("%m.%Y")

        if period == LeadPeriod.year:
            return current.strftime("%Y")

        return str(current)


class LeadCommentRepository(BaseRepository):
    model = LeadComment


class LeadStatusRepository(BaseRepository):
    model = LeadStatus

    async def get_max_level(self):
        result = await self.db.execute(
            select(
                func.max(LeadStatus.level)
            )
        )
        return result.scalar() or 0

    async def move_deleted(self, level: int):
        await self.db.execute(
            update(
                LeadStatus
            ).where(
                LeadStatus.level > level
            ).values(
                level=LeadStatus.level - 1
            )
        )

    async def move_level(self, status_id: int, new_position: int, old_position: int):
        if new_position < old_position:
            await self.db.execute(
                update(LeadStatus)
                .where(LeadStatus.level >= new_position, LeadStatus.level < old_position)
                .where(LeadStatus.id != status_id)
                .values(level=LeadStatus.level + 1)
            )
        else:
            # Двигаем вниз — сдвигаем вверх статусы между old_position + 1 и new_position
            await self.db.execute(
                update(LeadStatus)
                .where(LeadStatus.level <= new_position, LeadStatus.level > old_position)
                .where(LeadStatus.id != status_id)
                .values(level=LeadStatus.level - 1)
            )


class LeadFileRepository(BaseRepository):
    model = LeadFile
