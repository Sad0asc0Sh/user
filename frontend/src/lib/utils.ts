import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a numeric price with locale formatting.
 * Defaults to Persian locale.
 */
export function formatPrice(value: number, locale: string = "fa-IR"): string {
  return Number(value || 0).toLocaleString(locale);
}

/**
 * Calculate discounted price given base price and percentage.
 * Returns a rounded integer (Tomans).
 */
export function calculateDiscountPrice(price: number, discountPercent: number): number {
  if (!Number.isFinite(price) || !Number.isFinite(discountPercent)) return 0;
  const final = price * (1 - discountPercent / 100);
  return Math.max(0, Math.round(final));
}
