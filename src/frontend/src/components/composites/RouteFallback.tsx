import { Spinner } from "@/components/ui";

/** Page-level loading fallback outside of an <AppLayout> context. */
export function RouteFallback() {
  return (
    <div className="grid min-h-dvh place-items-center bg-canvas">
      <Spinner className="size-7 text-muted" />
    </div>
  );
}
