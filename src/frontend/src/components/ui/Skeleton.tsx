import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/** Loading placeholder that matches the surfaces it stands in for. */
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-lg bg-raised", className)}
      {...props}
    />
  );
}
