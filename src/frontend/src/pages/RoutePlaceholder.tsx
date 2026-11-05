import { InboxIcon } from "@/components/ui";
import { PageHeader } from "@/components/composites/PageHeader";
import { Card, CardBody, EmptyState } from "@/components/ui";

export interface RoutePlaceholderProps {
  title: string;
  /** Say exactly what this screen will show, not marketing copy. */
  description: string;
}

/**
 * Honest stub for routes that are scaffolded but not implemented yet.
 * Replace the element in src/routes/router.tsx once the feature page and the
 * endpoint it depends on are ready.
 */
export function RoutePlaceholder({ title, description }: RoutePlaceholderProps) {
  return (
    <div className="space-y-8">
      <PageHeader title={title} description={description} />
      <Card>
        <CardBody className="p-0">
          <EmptyState
            className="border-0"
            icon={<InboxIcon className="size-8" aria-hidden="true" />}
            title="Scaffolded, not wired up yet"
            description="This screen is part of the layout shell. Its page component and data service land in src/features as the API comes online."
          />
        </CardBody>
      </Card>
    </div>
  );
}
