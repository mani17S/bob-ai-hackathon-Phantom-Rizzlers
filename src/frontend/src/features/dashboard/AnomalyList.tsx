import { Badge, severityTone } from "@/components/ui";
import type { Anomaly } from "@/types";
import { formatRelativeTime } from "@/utils/format";

/**
 * Newest-first list of scored anomalies. Pure presentational component:
 * all data and formatting come from props/helpers, so it can be reused in
 * the full anomaly feed once that endpoint is connected.
 */
export function AnomalyList({ anomalies }: { anomalies: Anomaly[] }) {
  return (
    <ul className="divide-y divide-subtle">
      {anomalies.map((anomaly) => (
        <li
          key={anomaly.id}
          className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:gap-4"
        >
          <div className="sm:w-24 sm:shrink-0">
            <Badge tone={severityTone(anomaly.severity)} dot>
              {anomaly.severity}
            </Badge>
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-mono text-xs text-muted">
              {anomaly.pipeline} · {anomaly.id}
            </p>
            <p className="mt-0.5 text-sm font-medium text-foreground">
              {anomaly.summary}
            </p>
          </div>

          <div className="flex items-baseline gap-6 sm:w-44 sm:shrink-0 sm:justify-end">
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-wider text-muted">score</p>
              <p className="font-mono text-sm font-semibold tabular-nums text-foreground">
                {anomaly.score.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-wider text-muted">detected</p>
              <p className="font-mono text-sm tabular-nums text-foreground">
                {formatRelativeTime(anomaly.detectedAt)}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
