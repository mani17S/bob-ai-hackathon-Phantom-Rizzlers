import { useEffect, useState } from "react";

/**
 * Debounce any fast-changing value (search input, slider…) before it
 * triggers work such as API calls or expensive filtering.
 *
 *   const query = useDebouncedValue(searchInput, 300);
 */
export function useDebouncedValue<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);

  return debounced;
}
