import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  EmptyState,
  InboxIcon,
  Input,
  RefreshIcon,
  SearchIcon,
  Skeleton,
} from "@/components/ui";
import {
  DemoModeBanner,
  ErrorNotice,
  PageHeader,
} from "@/components/composites";
import { AnomalyRow } from "@/features/anomalies/AnomalyRow";
import { useApi } from "@/hooks/useApi";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { anomalyService } from "@/services/anomalyService";
import type { AnomalyQuery } from "@/types";

type SeverityFilter = NonNullable<AnomalyQuery["severity"]>;

const SEVERITY_OPTIONS: ReadonlyArray<{ value: SeverityFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
] as const;

/**
 * Anomaly feed: full scored history with search and severity filtering.
 * Fetching goes through anomalyService, so live API and demo mode receive
 * the same filters and stay indistinguishable to this component.
 */
export function AnomaliesPage() {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState<SeverityFilter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const query = useDebouncedValue(search, 300);

  const { data, error, loading, refresh } = useApi(
    () =>
      anomalyService.listAnomalies({
        query: query.trim() || undefined,
        severity,
      }),
    [query, severity],
  );

  const items = data?.items ?? [];
  const total = data?.total ?? items.length;
  const filtersActive = query.trim().length > 0 || severity !== "all";

  const clearFilters = () => {
    setSearch("");
    setSeverity("all");
    setExpandedId(null);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Anomaly feed"
        description="Full scored history across all monitored pipelines. Click a row for the detection record."
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
          heading="Failed to load the anomaly feed."
          detail={error.message}
          onRetry={refresh}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Scored anomalies</CardTitle>
          {!loading && items.length > 0 && (
            <BadgeCount items={items.length} total={total} filtered={filtersActive} />
          )}
        </CardHeader>

        <CardBody className="p-0">
          {/* Filter bar: sensible controls, all wired to the actual query. */}
          <div className="flex flex-col gap-3 border-b border-subtle px-5 py-4 sm:flex-row sm:items-center">
            <div className="w-full sm:max-w-xs">
              <Input
                label="Search"
                labelSuffix={
                  <span className="font-mono text-[11px] text-muted">
                    debounced 300 ms
                  </span>
                }
                placeholder="Pipeline, anomaly ID, or summary text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                leading={<SearchIcon className="size-4" aria-hidden="true" />}
                autoComplete="off"
                type="search"
              />
            </div>
            <div
              role="group"
              aria-label="Filter by severity"
              className="flex flex-wrap gap-1.5 sm:ml-auto"
            >
              {SEVERITY_OPTIONS.map(({ value, label }) => (
                <Button
                  key={value}
                  variant={severity === value ? "secondary" : "ghost"}
                  size="sm"
                  aria-pressed={severity === value}
                  onClick={() => setSeverity(value)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="divide-y divide-subtle">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-5 py-4"
                  aria-hidden="true"
                >
                  <Skeleton className="h-5 w-20 rounded-md" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <Skeleton className="hidden h-4 w-20 md:block" />
                  <Skeleton className="size-4" />
                </div>
              ))}
            </div>
          ) : !error && items.length === 0 ? (
            filtersActive ? (
              <EmptyState
                className="border-0"
                icon={<SearchIcon className="size-8" aria-hidden="true" />}
                title="No anomalies match these filters"
                description="No record matches the current search text and severity chip. Widen the filters to see more of the feed."
                action={
                  <Button variant="secondary" size="sm" onClick={clearFilters}>
                    Clear filters
                  </Button>
                }
              />
            ) : (
              <EmptyState
                className="border-0"
                icon={<InboxIcon className="size-8" aria-hidden="true" />}
                title="No anomalies recorded"
                description="The model has not flagged any pipeline runs yet. New detections land here as pipelines execute."
              />
            )
          ) : (
            <ul className="divide-y divide-subtle">
              {items.map((anomaly) => (
                <AnomalyRow
                  key={anomaly.id}
                  anomaly={anomaly}
                  expanded={expandedId === anomaly.id}
                  onToggle={() =>
                    setExpandedId((current) =>
                      current === anomaly.id ? null : anomaly.id,
                    )
                  }
                />
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

function BadgeCount({
  items,
  total,
  filtered,
}: {
  items: number;
  total: number;
  filtered: boolean;
}) {
  return (
    <Badge tone="neutral">
      {filtered ? `${items} of ${total} shown` : `${total} total`}
    </Badge>
  );
}
