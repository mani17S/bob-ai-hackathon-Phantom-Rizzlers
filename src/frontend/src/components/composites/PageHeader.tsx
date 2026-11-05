import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface PageHeaderProps {
  title: string;
  /** One concrete sentence about what the user is looking at. No fluff. */
  description?: string;
  actions?: ReactNode;
  className?: string;
}

/** Title row at the top of every page: h1, optional description, actions. */
export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <section
      className={cn("flex flex-wrap items-start justify-between gap-4", className)}
    >
      <div className="max-w-2xl">
        <h1 className="text-display text-foreground">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </section>
  );
}
