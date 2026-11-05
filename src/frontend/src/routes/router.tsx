import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/layouts/AppLayout";
import { DashboardPage } from "@/features/dashboard/DashboardPage";
import { AnomaliesPage } from "@/features/anomalies/AnomaliesPage";
import { RoutePlaceholder } from "@/pages/RoutePlaceholder";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { TermsPage } from "@/pages/TermsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

/**
 * Route table. Every page renders inside <AppLayout> (sidebar + topbar).
 * Placeholder screens mark work that is scaffolded but not implemented:
 * swap the <RoutePlaceholder> element for the real feature page when the
 * backend endpoint it needs is live.
 */
export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/anomalies", element: <AnomaliesPage /> },
      {
        path: "/pipelines",
        element: (
          <RoutePlaceholder
            title="Pipelines"
            description="Per-pipeline status, run history, and success rates. Data comes from the /api/pipelines endpoint."
          />
        ),
      },
      {
        path: "/settings",
        element: (
          <RoutePlaceholder
            title="Settings"
            description="Thresholds, notification channels, and model preferences for the ops team account."
          />
        ),
      },
      { path: "/privacy", element: <PrivacyPage /> },
      { path: "/terms", element: <TermsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
