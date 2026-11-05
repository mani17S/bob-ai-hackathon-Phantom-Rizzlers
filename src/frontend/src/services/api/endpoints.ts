/**
 * Central endpoint registry - keeps URLs in one place and out of components.
 * Adjust paths to match the backend contract when it lands.
 */
export const ENDPOINTS = {
  overview: "/api/overview", // summary + anomalies + pipelines in one shot
  anomalies: "/api/anomalies",
  pipelines: "/api/pipelines",
  incidents: "/api/incidents",
} as const;
