import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatISO8601Duration(duration: string): string {
  const regex = /P(?:([0-9]+)D)?T?(?:([0-9]+)H)?(?:([0-9]+)M)?(?:([0-9]+)S)?/;
  const matches = duration.match(regex);

  if (!matches) return "Invalid duration";

  const days = matches[1] ? `${matches[1]} day(s)` : '';
  const hours = matches[2] ? `${matches[2]} hour(s)` : '';
  const minutes = matches[3] ? `${matches[3]} minute(s)` : '';
  const seconds = matches[4] ? `${matches[4]} second(s)` : '';

  return [days, hours, minutes, seconds].filter(Boolean).join(' ');
}