import type {
  Anomaly,
  DashboardSummary,
  OverviewResponse,
  Pipeline,
} from "@/types";

/**
 * Realistic demo data so the whole UI runs before a backend exists.
 * When `VITE_API_URL` is set, these are ignored (see anomalyService).
 */

export const mockSummary: DashboardSummary = {
  anomalies24h: 5,
  openIncidents: 2,
  pipelinesMonitored: 18,
  healthScore: 87,
};

export const mockAnomalies: Anomaly[] = [
  {
    id: "AN-1042",
    pipeline: "deploy-api",
    severity: "critical",
    summary: "CPU saturation persisted for 12 min after Wednesday's release",
    score: 0.93,
    detectedAt: "2026-11-05T09:14:00Z",
  },
  {
    id: "AN-1041",
    pipeline: "data-ingest",
    severity: "high",
    summary: "Log volume dropped 80%, and ingestion may be stalled",
    score: 0.81,
    detectedAt: "2026-11-05T08:42:00Z",
  },
  {
    id: "AN-1040",
    pipeline: "checkout-worker",
    severity: "medium",
    summary: "p95 latency trending upward across the last 5 runs",
    score: 0.64,
    detectedAt: "2026-11-05T07:05:00Z",
  },
  {
    id: "AN-1039",
    pipeline: "etl-batch",
    severity: "critical",
    summary: "Queue depth exceeded 500k events for 3 consecutive checks",
    score: 0.91,
    detectedAt: "2026-11-04T22:38:00Z",
  },
  {
    id: "AN-1038",
    pipeline: "deploy-api",
    severity: "high",
    summary: "Canary rollout error rate tripled within 5 min of promotion",
    score: 0.77,
    detectedAt: "2026-11-04T19:02:00Z",
  },
  {
    id: "AN-1037",
    pipeline: "ml-training",
    severity: "low",
    summary: "Unusual cache-miss ratio on the model artifact step",
    score: 0.37,
    detectedAt: "2026-11-03T22:38:00Z",
  },
  {
    id: "AN-1036",
    pipeline: "image-render-worker",
    severity: "medium",
    summary: "Checkpoint save ran 2x slower than the 30-day average",
    score: 0.55,
    detectedAt: "2026-11-03T14:20:00Z",
  },
  {
    id: "AN-1035",
    pipeline: "data-ingest",
    severity: "medium",
    summary: "Retries on the gRPC sink climbed to 8% of ingested events",
    score: 0.58,
    detectedAt: "2026-11-02T18:55:00Z",
  },
];

export const mockPipelines: Pipeline[] = [
  {
    id: "pl-01",
    name: "deploy-api",
    status: "failing",
    lastRunAt: "2026-11-05T09:10:00Z",
    successRate: 0.82,
  },
  {
    id: "pl-02",
    name: "data-ingest",
    status: "healthy",
    lastRunAt: "2026-11-05T08:40:00Z",
    successRate: 0.97,
  },
  {
    id: "pl-03",
    name: "checkout-worker",
    status: "healthy",
    lastRunAt: "2026-11-05T07:00:00Z",
    successRate: 0.91,
  },
  {
    id: "pl-04",
    name: "ml-training",
    status: "idle",
    lastRunAt: "2026-11-03T04:30:00Z",
    successRate: 1.0,
  },
];

export function mockOverview(): OverviewResponse {
  return {
    summary: mockSummary,
    // The overview card is a preview; the full history lives in /anomalies.
    anomalies: mockAnomalies.slice(0, 5),
    pipelines: mockPipelines,
  };
}
