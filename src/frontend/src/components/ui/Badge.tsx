import type { ComponentProps, ReactNode } from "react";
import type { Severity } from "@/types";
import { cn } from "@/utils/cn";

type Tone =
  | "neutral"
  | "brand"
  | "success"
  | "warning"
  | "danger"
  | "info";

/**
 * Status chip. Translucent tints + theme-aware text keep contrast correct in
 * light and dark mode without duplicating classes.
 */
const toneClasses: Record<Tone, string> = {
  neutral: "border-strong bg-raised text-muted",
  brand: "border-brand-500/30 bg-brand-500/10 text-brand-700 dark:text-brand-300",
  success:
    "border-success-500/30 bg-success-500/10 text-success-700 dark:text-success-400",
  warning:
    "border-warning-500/30 bg-warning-500/10 text-warning-700 dark:text-warning-400",
  danger:
    "border-danger-500/30 bg-danger-500/10 text-danger-700 dark:text-danger-400",
  info: "border-info-500/30 bg-info-500/10 text-info-700 dark:text-info-400",
};

export interface BadgeProps extends ComponentProps<"span"> {
  tone?: Tone;
  /** Leading status dot, e.g. <Badge tone="success" dot>Healthy</Badge>. */
  dot?: boolean;
  children: ReactNode;
}

/**
 * Domain mapping shared by every anomaly view so severity colors stay
 * identical across pages.
 */
export function severityTone(severity: Severity): Tone {
  switch (severity) {
    case "critical":
      return "danger";
    case "high":
      return "warning";
    case "medium":
      return "info";
    case "low":
      return "neutral";
  }
}

export function Badge({
  tone = "neutral",
  dot = false,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5",
        "text-xs font-medium whitespace-nowrap",
        toneClasses[tone],
        className,
      )}
      {...rest}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
