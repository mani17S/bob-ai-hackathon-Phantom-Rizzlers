import { AlertIcon, Button, Card, CardBody } from "@/components/ui";

export interface ErrorNoticeProps {
  heading: string;
  /** Detail from the error (e.g. `error.message`). */
  detail?: string;
  onRetry?: () => void;
}

/** Inline failure panel with a working retry path. Never fakes success. */
export function ErrorNotice({ heading, detail, onRetry }: ErrorNoticeProps) {
  return (
    <Card className="border-danger-500/40 bg-danger-500/5">
      <CardBody className="flex flex-wrap items-center gap-3">
        <AlertIcon
          className="size-4 shrink-0 text-danger-600 dark:text-danger-400"
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">{heading}</p>
          {detail && (
            <p className="truncate font-mono text-xs text-muted">{detail}</p>
          )}
        </div>
        {onRetry && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onRetry}
            className="ml-auto"
          >
            Retry
          </Button>
        )}
      </CardBody>
    </Card>
  );
}
