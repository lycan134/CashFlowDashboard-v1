from calendar import monthrange
from datetime import date, datetime


def as_date(value):
    if isinstance(value, date):
        return value
    if isinstance(value, datetime):
        return value.date()
    return date.fromisoformat(value)


def get_next_month_date(current_date, day=None):
    current_date = as_date(current_date)
    target_day = day or current_date.day
    year = current_date.year + (1 if current_date.month == 12 else 0)
    month = 1 if current_date.month == 12 else current_date.month + 1
    return date(year, month, min(target_day, monthrange(year, month)[1]))


def get_next_due_date(current_date, due_day):
    current_date = as_date(current_date)
    due_day = min(max(int(due_day), 1), 31)
    current_month_due = date(
        current_date.year,
        current_date.month,
        min(due_day, monthrange(current_date.year, current_date.month)[1])
    )

    if current_date < current_month_due:
        return current_month_due

    return get_next_month_date(current_date, due_day)
