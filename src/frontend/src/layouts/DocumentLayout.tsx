import type { ReactNode } from "react";

/**
 * Container for policy / documentation pages: readable measure, generous
 * spacing. Rendered inside the AppLayout main container, so it must not
 * provide its own <main>.
 */
export function DocumentLayout({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-3xl py-2">
      {children}
    </section>
  );
}
