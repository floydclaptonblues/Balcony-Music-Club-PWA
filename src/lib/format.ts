import type { ScheduleItem } from '../data/types';

export function isConfigured(value: string | undefined | null): value is string {
  return Boolean(value && value.trim().length > 0);
}

export function telHref(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  return digits.length === 10 ? `tel:+1${digits}` : `tel:${digits}`;
}

export function mailHref(email: string): string {
  return `mailto:${email}`;
}

export function futureSchedule(items: ScheduleItem[], now = new Date()): ScheduleItem[] {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return items
    .filter((item) => new Date(`${item.date}T23:59:59`).getTime() >= today)
    .sort((a, b) => `${a.date} ${a.startTime}`.localeCompare(`${b.date} ${b.startTime}`));
}
