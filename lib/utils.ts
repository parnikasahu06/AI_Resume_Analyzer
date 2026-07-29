import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPercent(val: number): string {
  return `${Math.round(val)}%`;
}

export function getScoreColorClass(score: number): {
  text: string;
  bg: string;
  border: string;
  badgeBg: string;
  badgeText: string;
} {
  if (score >= 80) {
    return {
      text: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      border: "border-emerald-200 dark:border-emerald-800",
      badgeBg: "bg-emerald-100 dark:bg-emerald-900/60",
      badgeText: "text-emerald-800 dark:text-emerald-300",
    };
  }
  if (score >= 60) {
    return {
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      border: "border-amber-200 dark:border-amber-800",
      badgeBg: "bg-amber-100 dark:bg-amber-900/60",
      badgeText: "text-amber-800 dark:text-amber-300",
    };
  }
  return {
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    border: "border-rose-200 dark:border-rose-800",
    badgeBg: "bg-rose-100 dark:bg-rose-900/60",
    badgeText: "text-rose-800 dark:text-rose-300",
  };
}
