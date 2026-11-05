import { ENDPOINTS } from "@/services/api/endpoints";
import { isDemoMode, request } from "@/services/api/client";
import { mockAnomalies, mockOverview } from "@/services/mock/mockData";
import type {
  Anomaly,
  AnomalyQuery,
  OverviewResponse,
  Paginated,
} from "@/types";

/**
 * Domain service for the pipeline-anomaly console (matches the solution
 * overview: frontend → FastAPI → watsonx.ai). One object per domain keeps
 * services discoverable; components import from here only.
 */

const DEMO_DELAY_MS = 350; // simulate network so skeletons are visible

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Return demo data when no API is configured; otherwise hit the real API.
 * Swap the mock fallback for throwing once the backend is connected.
 */
async function withDemoFallback<T>(
  remote: () => Promise<T>,
  demo: () => T,
): Promise<T> {
  if (isDemoMode) {
    await delay(DEMO_DELAY_MS);
    return demo();
  }
  return remote();
}

/** Demo-mode stand-in for the server-side search/filter/sort. */
function filterDemoAnomalies({
  query,
  severity,
}: AnomalyQuery): Paginated<Anomaly> {
  const needle = (query ?? "").trim().toLowerCase();
  let items = mockAnomalies;

  if (needle) {
    items = items.filter(
      (anomaly) =>
        anomaly.pipeline.toLowerCase().includes(needle) ||
        anomaly.id.toLowerCase().includes(needle) ||
        anomaly.summary.toLowerCase().includes(needle),
    );
  }

  if (severity && severity !== "all") {
    items = items.filter((anomaly) => anomaly.severity === severity);
  }

  items = [...items].sort((a, b) => b.detectedAt.localeCompare(a.detectedAt));

  return {
    items,
    total: mockAnomalies.length, // unfiltered total, for "n of m shown"
    page: 1,
    pageSize: items.length,
  };
}

export const anomalyService = {
  /** True when the app is running against mock data (no VITE_API_URL). */
  isDemoMode,

  getOverview(): Promise<OverviewResponse> {
    return withDemoFallback(
      () => request<OverviewResponse>(ENDPOINTS.overview),
      mockOverview,
    );
  },

  /**
   * Scored anomaly history. In live mode the search text and severity go to
   * the API as query params; in demo mode the same filtering is applied
   * client-side over the mock set, so both states behave identically.
   */
  listAnomalies(query: AnomalyQuery = {}): Promise<Paginated<Anomaly>> {
    return withDemoFallback(
      () => {
        const severityParam =
          query.severity && query.severity !== "all" ? query.severity : undefined;
        return request<Paginated<Anomaly>>(ENDPOINTS.anomalies, {
          params: { q: query.query, severity: severityParam },
        });
      },
      () => filterDemoAnomalies(query),
    );
  },
};
