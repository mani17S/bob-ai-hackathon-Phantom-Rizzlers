import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";
import {
  ActivityIcon,
  BellIcon,
  BranchIcon,
  SettingsIcon,
} from "@/components/ui/icons";
import { cn } from "@/utils/cn";

const NAV_ITEMS = [
  { to: "/", label: "Overview", icon: ActivityIcon, end: true },
  { to: "/pipelines", label: "Pipelines", icon: BranchIcon, end: false },
  { to: "/anomalies", label: "Anomaly feed", icon: BellIcon, end: false },
  { to: "/settings", label: "Settings", icon: SettingsIcon, end: false },
] as const;

const LEGAL_ITEMS = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
] as const;

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-raised text-foreground"
      : "text-muted hover:bg-raised hover:text-foreground",
  );

/**
 * Primary navigation. `onNavigate` (from the mobile drawer) closes the drawer
 * after a tap. `slot` renders an extra control at the top (drawer close btn).
 */
export function Sidebar({
  onNavigate,
  slot,
}: {
  onNavigate?: () => void;
  slot?: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Brand: flat mark. No gradients, per the design rules. */}
      <div className="flex items-center gap-3 border-b border-subtle px-4 py-4">
        <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-600 text-sm font-bold text-white">
          P
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold tracking-tight text-foreground">
            Phantom Rizzlers
          </p>
          <p className="truncate text-xs text-muted">Pipeline console</p>
        </div>
        {slot}
      </div>

      <nav
        aria-label="Primary"
        className="flex-1 space-y-1 overflow-y-auto px-3 py-4"
      >
        {NAV_ITEMS.map(({ to, label, icon: IconC, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={linkClass}
          >
            <IconC className="size-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-subtle px-3 py-4">
        <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
          Legal
        </p>
        <nav aria-label="Legal" className="space-y-1">
          {LEGAL_ITEMS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-3 py-1.5 text-xs transition-colors rounded-lg",
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:bg-raised hover:text-foreground",
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <p className="px-3 pt-3 text-[11px] text-muted">v0.1.0</p>
      </div>
    </div>
  );
}
