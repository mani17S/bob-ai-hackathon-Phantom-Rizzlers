/**
 * Tiny class-name composer (clsx-lite). Keeps JSX readable without adding a
 * dependency. Upgrade to `clsx` + `tailwind-merge` if class conflicts start
 * to hurt.
 */
export type ClassValue = string | number | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
