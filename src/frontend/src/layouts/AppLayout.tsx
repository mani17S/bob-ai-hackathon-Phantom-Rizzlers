import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/composites/Sidebar";
import { Topbar } from "@/components/composites/Topbar";
import { XIcon } from "@/components/ui";
import { cn } from "@/utils/cn";

/**
 * Master application shell.
 *
 * Structure:
 *  - Fixed 16rem sidebar on lg+ screens, harmless slide-in drawer below that.
 *  - Sticky topbar with the current route title and the theme toggle.
 *  - Constrained main content container (max-w-7xl) hosting the routed page.
 */
export function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const closeMobileNav = () => setMobileNavOpen(false);

  const closeSlot = (
    <button
      type="button"
      onClick={closeMobileNav}
      aria-label="Close navigation"
      className="grid size-9 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-raised hover:text-foreground"
    >
      <XIcon className="size-4" />
    </button>
  );

  return (
    <div className="min-h-dvh bg-canvas">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-subtle bg-surface lg:block">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-neutral-950/60"
            onClick={closeMobileNav}
            aria-hidden="true"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="absolute inset-y-0 left-0 flex w-64 max-w-[85vw] flex-col border-r border-subtle bg-surface"
          >
            <Sidebar onNavigate={closeMobileNav} slot={closeSlot} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <Topbar onMenuClick={() => setMobileNavOpen(true)} />

        <main
          id="main-content"
          className={cn(
            "mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8",
            "min-h-[calc(100dvh-3.5rem)]",
          )}
        >
          <Outlet />
        </main>

        <footer className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <p className="text-xs text-muted">
            Phantom Rizzlers · BOB AI Hackathon ·{" "}
            <a href="/privacy" className="underline underline-offset-2 hover:text-foreground">
              Privacy Policy
            </a>{" "}
            ·{" "}
            <a href="/terms" className="underline underline-offset-2 hover:text-foreground">
              Terms
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
