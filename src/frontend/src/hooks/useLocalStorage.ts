import { useCallback, useState } from "react";

/**
 * State synced to localStorage (SSR-safe lazy init, JSON serialization).
 * Used by useTheme; also handy for "don't show onboarding again" flags.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((previous: T) => T)) => void] {
  const [stored, setStored] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? initialValue : (JSON.parse(raw) as T);
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((previous: T) => T)) => {
      setStored((previous) => {
        const next =
          typeof value === "function" ? (value as (p: T) => T)(previous) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // Storage unavailable (private mode / full quota) - stay in-memory.
        }
        return next;
      });
    },
    [key],
  );

  return [stored, setValue];
}
