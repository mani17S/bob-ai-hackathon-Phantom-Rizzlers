import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Data-fetching primitive: wrap any service call in a component.
 *
 *   const { data, error, loading, refresh } = useApi(anomalyService.getOverview, []);
 *
 * Handles loading/error state, stale-response cancellation, and manual
 * refresh. No external dependency - swap for React Query / SWR if the app
 * grows and needs caching, retries, pagination, etc.
 */
export interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

export interface ApiResource<T> extends AsyncState<T> {
  /** Re-run the fetcher (e.g. from a Refresh button). */
  refresh: () => void;
}

export function useApi<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
): ApiResource<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: true,
  });
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState((current) => ({ ...current, loading: true, error: null }));

    fetcherRef
      .current()
      .then((data) => {
        if (!cancelled) setState({ data, error: null, loading: false });
      })
      .catch((error: unknown) => {
        // Ignore abort noise from StrictMode double-invocation teardown.
        if (!cancelled && (error as Error)?.name !== "AbortError") {
          setState((current) => ({
            ...current,
            error: error instanceof Error ? error : new Error(String(error)),
            loading: false,
          }));
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, ...deps]);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  return { ...state, refresh };
}
