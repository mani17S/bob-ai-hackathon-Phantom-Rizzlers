import { Link } from "react-router-dom";
import { Button } from "@/components/ui";

/** Route-agnostic error screen for dead links and bad deep links. */
export function NotFoundPage() {
  return (
    <div className="grid min-h-[50vh] place-content-center gap-3 text-center">
      <p className="font-mono text-sm text-muted">HTTP 404</p>
      <h1 className="text-xl font-semibold tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="mx-auto max-w-sm text-sm text-muted">
        The address you opened does not match a route in this console. Use the
        sidebar to get back to Overview.
      </p>
      <div>
        <Link to="/">
          <Button variant="secondary" size="sm">
            Back to Overview
          </Button>
        </Link>
      </div>
    </div>
  );
}
