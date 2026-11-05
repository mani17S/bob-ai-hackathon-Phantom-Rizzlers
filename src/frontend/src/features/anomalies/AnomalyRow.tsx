import { Badge, ChevronDownIcon, severityTone } from "@/components/ui";
import type { Anomaly } from "@/types";
import { cn } from "@/utils/cn";
import { formatDateTime, formatRelativeTime } from "@/utils/format";

export interface AnomalyRowProps {
  anomaly: Anomaly;
  expanded: boolean;
  onToggle: () => void;
}

/**
 * One scored anomaly: collapsed summary row (click to expand) and an inline
 * detail panel with the record's fields. Informational only in this state:
 * actions such as incident linking arrive with the /api/incidents endpoint.
 */
export function AnomalyRow({ anomaly, expanded, onToggle }: AnomalyRowProps) {
  const detailsId = `anomaly-details-${anomaly.id}`;

  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={detailsId}
        className="flex w-full flex-col gap-2 px-5 py-4 text-left transition-colors hover:bg-raised sm:flex-row sm:items-center sm:gap-4"
      >
        <span className="sm:w-24 sm:shrink-0">
          <Badge tone={severityTone(anomaly.severity)} dot>
            {anomaly.severity}
          </Badge>
        </span>

        <span className="min-w-0 flex-1">
          <span className="block font-mono text-xs text-muted">
            {anomaly.pipeline} · {anomaly.id}
          </span>
          <span className="mt-0.5 block text-sm font-medium text-foreground">
            {anomaly.summary}
          </span>
        </span>

        <span className="flex items-baseline gap-6 sm:w-44 sm:shrink-0 sm:justify-end">
          <span className="text-right">
            <span className="block text-[11px] uppercase tracking-wider text-muted">
              score
            </span>
            <span className="block font-mono text-sm font-semibold tabular-nums text-foreground">
              {anomaly.score.toFixed(2)}
            </span>
          </span>
          <span className="hidden text-right md:block">
            <span className="block text-[11px] uppercase tracking-wider text-muted">
              detected
            </span>
            <span className="block font-mono text-sm tabular-nums text-foreground">
              {formatRelativeTime(anomaly.detectedAt)}
            </span>
          </span>
        </span>

        <ChevronDownIcon
          className={cn(
            "size-4 shrink-0 self-center text-muted transition-transform",
            expanded && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {expanded && (
        <dl
          id={detailsId}
          className="grid gap-x-6 gap-y-3 border-t border-subtle px-5 py-4 sm:grid-cols-2"
        >
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-wider text-muted">
              Pipeline
            </dt>
            <dd className="mt-0.5 font-mono text-sm text-foreground">
              {anomaly.pipeline}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-wider text-muted">
              Anomaly ID
            </dt>
            <dd className="mt-0.5 font-mono text-sm text-foreground">
              {anomaly.id}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-wider text-muted">
              Model
            </dt>
            <dd className="mt-0.5 text-sm text-foreground">
              severity {anomaly.severity}, score {anomaly.score.toFixed(3)}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-wider text-muted">
              Detected
            </dt>
            <dd className="mt-0.5 font-mono text-sm text-foreground">
              {formatDateTime(anomaly.detectedAt)}
            </dd>
          </div>
        </dl>
      )}
    </li>
  );
}
