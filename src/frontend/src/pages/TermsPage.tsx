import type { ReactNode } from "react";
import { DocumentLayout } from "@/layouts/DocumentLayout";
import { PageHeader } from "@/components/composites/PageHeader";

function Section({ title, children }: { title: string; children: ReactNode }) {
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
 * Terms of Service for the pipeline anomaly console. Honest scope: this is a
 * hackathon prototype, and the terms say so.
 */
export function TermsPage() {
  return (
    <DocumentLayout>
      <PageHeader title="Terms of Service" description="Last updated: November 5, 2026" />

      <div className="mt-8 space-y-8">
        <Section title="Acceptance">
          <p>
            By running or interacting with this console you agree to these
            terms. If you disagree with any part of them, do not use the
            service. Team name and contact details can be found on the project
            repository and on the Privacy Policy page.
          </p>
        </Section>

        <Section title="What this service is">
          <p>
            This is a hackathon prototype submitted by team Phantom Rizzlers
            for evaluation purposes. It displays machine-scored anomalies in
            CI/CD pipeline logs. It is provided "as is" and "as available",
            without warranties of any kind, express or implied, including
            fitness for a particular purpose.
          </p>
        </Section>

        <Section title="Acceptable use">
          <p>
            Do not attempt to disrupt the service, revoke the access of other
            users, send malicious payloads through the pipeline integration,
            or use the console to process data you do not have the right to
            process. Misuse may result in access being revoked.
          </p>
        </Section>

        <Section title="Your data">
          <p>
            You retain ownership of the log data you connect to your instance.
            The service claims no intellectual property rights over that data.
            See the Privacy Policy for what is stored and for how long.
          </p>
        </Section>

        <Section title="Limitation of liability">
          <p>
            To the maximum extent permitted by law, the team is not liable for
            indirect, incidental, or consequential damages, nor for missed
            incidents, false alerts, or operational losses resulting from the
            use of this prototype in a production environment. Do not treat
            anomaly scores as a substitute for your own review and release
            procedures.
          </p>
        </Section>

        <Section title="Changes to the service">
          <p>
            The service may change or stop without notice during the
            hackathon. Updates to these terms appear on this page with an
            updated date at the top.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about these terms: Shashank Yadav,{" "}
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
