import { DocumentLayout } from "@/layouts/DocumentLayout";
import { PageHeader } from "@/components/composites/PageHeader";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

/**
 * Privacy Policy for the pipeline anomaly console. Plain, accurate, and
 * specific to what this application actually does. Contact address comes
 * from the team block in the root README.
 */
export function PrivacyPage() {
  return (
    <DocumentLayout>
      <PageHeader title="Privacy Policy" description="Last updated: November 5, 2026" />

      <div className="mt-8 space-y-8">
        <Section title="About this application">
          <p>
            This console is a hackathon prototype built by team Phantom
            Rizzlers for the BOB AI Hackathon. It analyzes CI/CD pipeline logs
            and displays model-scored anomalies to operations teams.
          </p>
        </Section>

        <Section title="Data we process">
          <p>
            The application processes pipeline telemetry and log excerpts that
            your deployed instance is configured to collect. This data is sent
            to the backend service of the same project, stored in its database,
            and used to compute anomaly scores. We do not collect personal
            profile data, contact lists, or browsing history through this
            application.
          </p>
        </Section>

        <Section title="What stays in your browser">
          <p>
            Your theme preference (light or dark) and any saved session token
            are stored in your browser's localStorage on your device. Clearing
            your browser storage removes them. The application sets no
            advertising or cross-site tracking cookies.
          </p>
        </Section>

        <Section title="Third-party services">
          <p>
            When configured with an inference endpoint, anomaly summaries are
            generated through AI model APIs. Only the log excerpts needed for
            scoring are transmitted. The hosting platform that serves this
            application records standard request logs (IP address, timestamp,
            status code) under its own data retention policy.
          </p>
        </Section>

        <Section title="Demo mode">
          <p>
            Without an API configured, the interface renders mock demo data
            that is clearly labeled as such. No data is collected in this mode.
          </p>
        </Section>

        <Section title="Your choices">
          <p>
            To request deletion of data your team sent through your own
            instance, contact the team lead below. You can disable telemetry
            collection at any time by disconnecting the pipeline integration.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            Material changes will be reflected in the "Last updated" date at
            the top of this page.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about this policy: Shashank Yadav,{" "}
            <a
              href="mailto:shashankyadav.10a@gmail.com"
              className="text-brand-600 underline underline-offset-2 hover:text-brand-500 dark:text-brand-400"
            >
              shashankyadav.10a@gmail.com
            </a>
          </p>
        </Section>
      </div>
    </DocumentLayout>
  );
}
