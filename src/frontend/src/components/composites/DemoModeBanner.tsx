import { AlertIcon } from "@/components/ui";
import { anomalyService } from "@/services/anomalyService";

/**
 * Honesty guardrail for demo mode: rendered while no API is configured so
 * mock values are never presented as live data. Pairs with the "Demo data"
 * chip in the topbar. Returns null (renders nothing) once VITE_API_URL is
 * set and the app talks to the real backend.
 */
export function DemoModeBanner() {
  if (!anomalyService.isDemoMode) return null;

  return (
    <div className="flex items-start gap-2.5 rounded-card border border-warning-500/30 bg-warning-500/10 px-4 py-3 text-sm text-warning-700 dark:text-warning-400">
      <AlertIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <p>
        <strong className="font-semibold">Demo data.</strong> No API is
        configured, so everything on this page is a mock value. Set{" "}
        <code className="font-mono text-xs">VITE_API_URL</code> in{" "}
        <code className="font-mono text-xs">.env.local</code> to render real
        data instead.
      </p>
    </div>
  );
}
