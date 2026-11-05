import { useLocation } from "react-router-dom";
import { Badge, Button, MenuIcon } from "@/components/ui";
import { ThemeToggle } from "@/components/composites/ThemeToggle";
import { anomalyService } from "@/services/anomalyService";

const ROUTE_TITLES: Record<string, string> = {
  "/": "Overview",
  "/pipelines": "Pipelines",
  "/anomalies": "Anomaly feed",
  "/settings": "Settings",
  "/privacy": "Privacy Policy",
  "/terms": "Terms of Service",
};

/**
 * Sticky topbar: current route title on the left, utility controls on the
 * right. Shows an explicit "Demo data" chip while no API is connected so
 * mock numbers are never mistaken for real ones.
 */
export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { pathname } = useLocation();
  const title = ROUTE_TITLES[pathname] ?? "Overview";

  return (
    <header className="sticky top-0 z-30 border-b border-subtle bg-surface/80 backdrop-blur">
      <div className="flex h-14 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="px-2 lg:hidden"
        >
          <MenuIcon className="size-5" />
        </Button>

        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          {title}
        </h2>

        <div className="ml-auto flex items-center gap-2">
          {anomalyService.isDemoMode && (
            <Badge tone="warning" dot title="No API configured: all data on screen is mock demo data">
              Demo data
            </Badge>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
