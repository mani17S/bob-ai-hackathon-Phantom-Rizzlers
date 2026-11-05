/** Formatting helpers shared across features. */

/** "2026-11-05T08:42:00Z" → "31m ago" / "3h ago" / "2d ago". */
export function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(diffMs / 60_000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  return `${Math.round(hours / 24)}d ago`;
}

/** "2026-11-05T08:42:00Z" → "2026-11-05 08:42 UTC". */
export function formatDateTime(iso: string): string {
  const isoShort = new Date(iso).toISOString();
  return `${isoShort.slice(0, 10)} ${isoShort.slice(11, 16)} UTC`;
}

/** 0.82 → "82%"  ·  undefined → "n/a". */
export function formatPercent(value?: number): string {
  if (value === undefined || Number.isNaN(value)) return "n/a";
  return `${Math.round(value * 100)}%`;
}
