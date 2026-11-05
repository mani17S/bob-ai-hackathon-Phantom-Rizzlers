import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  EmptyState,
  InboxIcon,
  RefreshIcon,
  Skeleton,
} from "@/components/ui";
import { AnomalyList } from "@/features/dashboard/AnomalyList";
import {
  DemoModeBanner,
  ErrorNotice,
  PageHeader,
  StatCard,
} from "@/components/composites";
import { useApi } from "@/hooks/useApi";
import { anomalyService } from "@/services/anomalyService";
import type { Trend } from "@/types";

const STAT_DEFS: Array<{ label: string; hint: string }> = [
  { label: "Anomalies (24h)", hint: "scored by the model in the last 24 hours" },
  { label: "Open incidents", hint: "awaiting triage right now" },
  { label: "Pipelines monitored", hint: "connected to the collector" },
  { label: "Health score", hint: "weighted suite health, out of 100" },
];

function summaryTrend(): { trend?: Trend; trendLabel?: string } | undefined {
  return undefined; // trends arrive from the API once connected
}

/**
 * Overview page: summary stats plus the newest scored anomalies.
 * While no API is configured the service supplies labeled demo data; the
 * banner and the topbar chip keep that distinction visible at all times.
 */
export function DashboardPage() {
  const { data, error, loading, refresh } = useApi(anomalyService.getOverview, []);

  const stats = data?.summary;
  const anomalies = data?.anomalies ?? [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Overview"
        description="Model-scored anomalies from CI/CD pipeline logs, newest first. The health score weighs failing runs over the last 24 hours."
        actions={
          <Button variant="secondary" size="sm" onClick={refresh}>
            <RefreshIcon className="size-4" aria-hidden="true" />
            Refresh
          </Button>
        }
      />

      <DemoModeBanner />

      {error && (
        <ErrorNotice
          heading="Failed to load the overview."
          detail={error.message}
          onRetry={refresh}
        />
      )}

      {/* Summary stats: skeleton grid while loading, data when ready. */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loading || !stats
          ? STAT_DEFS.map(({ label }) => (
              <Card key={label} className="p-5">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="mt-3 h-9 w-16" />
                <Skeleton className="mt-3 h-3 w-32" />
              </Card>
            ))
          : (
              [
                { value: stats.anomalies24h, ...STAT_DEFS[0], ...summaryTrend() },
                { value: stats.openIncidents, ...STAT_DEFS[1], ...summaryTrend() },
                { value: stats.pipelinesMonitored, ...STAT_DEFS[2] },
                { value: stats.healthScore, ...STAT_DEFS[3] },
              ]
            ).map(({ label, value, hint, trend, trendLabel, ...rest }) => (
              <StatCard
                key={label}
                label={label}
                value={value}
                hint={hint}
                trend={trend}
                trendLabel={trendLabel}
                {...rest}
              />
            ))}
      </div>

      {/* Anomaly feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent anomalies</CardTitle>
          {!loading && anomalies.length > 0 && (
            <Badge tone="neutral">{anomalies.length}</Badge>
          )}
        </CardHeader>
        <CardBody className="p-0">
          {loading ? (
            <div className="divide-y divide-subtle">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-4">
                  <Skeleton className="h-5 w-20 rounded-md" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <Skeleton className="hidden h-4 w-16 sm:block" />
                </div>
              ))}
            </div>
          ) : anomalies.length === 0 ? (
            <EmptyState
              icon={<InboxIcon className="size-8" aria-hidden="true" />}
              title="No anomalies detected"
              description="When the model flags unusual behavior in a pipeline run, it appears here with a score and severity."
            />
          ) : (
            <AnomalyList anomalies={anomalies} />
          )}
        </CardBody>
      </Card>
    </div>
  );
}
