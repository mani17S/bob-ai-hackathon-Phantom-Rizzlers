import { Card, TrendDownIcon, TrendUpIcon } from "@/components/ui";
import type { Trend } from "@/types";
import { cn } from "@/utils/cn";

export interface StatCardProps {
  label: string;
  value: string | number;
  /** Factual qualifier under the value, e.g. "measured over the last 24 h". */
  hint?: string;
  /** Optional direction of change; color follows the tone, not decoration. */
  trend?: Trend;
  trendLabel?: string;
}

const trendClasses: Record<Trend, string> = {
  positive: "text-success-600 dark:text-success-400",
  negative: "text-danger-600 dark:text-danger-400",
  neutral: "text-muted",
};

export function StatCard({ label, value, hint, trend, trendLabel }: StatCardProps) {
  return (
    <Card className="p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold tabular-nums text-foreground">
        {value}
      </p>
      {trend !== "neutral" && trendLabel && (
        <p
          className={cn(
            "mt-2 flex items-center gap-1 text-xs font-medium",
            trendClasses[trend ?? "neutral"],
          )}
        >
          {trend === "positive" ? (
            <TrendUpIcon className="size-3.5" aria-hidden="true" />
          ) : (
            <TrendDownIcon className="size-3.5" aria-hidden="true" />
          )}
          {trendLabel}
        </p>
      )}
      {trend === "neutral" && hint && (
        <p className="mt-2 text-xs text-muted">{hint}</p>
      )}
    </Card>
  );
}
