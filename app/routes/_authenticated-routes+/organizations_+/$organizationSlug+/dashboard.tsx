import { useMemo, useState } from "react";
import { href, useLoaderData } from "react-router";

import type { Route } from "./+types/dashboard";
import { AiAssistantPanelComponent } from "./dashboard-ai-assistant";
import { CalendarGridComponent } from "./dashboard-calendar-grid";
import { DailyAgendaComponent } from "./dashboard-daily-agenda";
import { HiringGoalsCard } from "./dashboard-hiring-goals";
import { PipelineTrendsCard } from "./dashboard-pipeline-trends";
import { UrgentFunnelUpdatesComponent } from "./dashboard-urgent-funnel-updates";
import type { CalendarEvent } from "./dashboard-utils";
import { toDateKey } from "./dashboard-utils";
import { getInstance } from "~/features/localization/i18next-middleware.server";
import { getPageTitle } from "~/utils/get-page-title.server";

export function loader({ params, context }: Route.LoaderArgs) {
  const i18n = getInstance(context);
  const t = i18n.t.bind(i18n);

  const events: CalendarEvent[] = [
    {
      date: "2025-11-29",
      endHour: 11,
      id: 1,
      startHour: 8,
      title: "AI Candidate Screening",
    },
    {
      date: "2025-11-29",
      endHour: 10,
      id: 3,
      startHour: 8,
      title: "AI Candidate Screening xxx",
    },
    {
      date: "2025-11-28",
      endHour: 11,
      id: 2,
      startHour: 10,
      title: "Team Sync: Q4 Agentic Features",
    },
  ];

  return {
    breadcrump: {
      title: t("organizations:dashboard.breadcrumb"),
      to: href("/organizations/:organizationSlug/dashboard", {
        organizationSlug: params.organizationSlug,
      }),
    },
    events,
    pageTitle: getPageTitle(t, "organizations:dashboard.pageTitle"),
  };
}

export const meta: Route.MetaFunction = ({ loaderData }) => [
  { title: loaderData?.pageTitle },
];

export default function OrganizationDashboardRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [selectedItem, setSelectedItem] = useState<
    | { type: "event"; event: CalendarEvent }
    | { type: "slot"; hour: number }
    | null
  >(null);

  const selectedDateKey = useMemo(
    () => toDateKey(selectedDate),
    [selectedDate],
  );

  const eventsForDay = useMemo(
    () => loaderData.events.filter((e) => e.date === selectedDateKey),
    [loaderData.events, selectedDateKey],
  );

  const handlePrevDay = () => {
    setSelectedDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 1);
      return d;
    });
    setSelectedItem(null);
  };

  const handleNextDay = () => {
    setSelectedDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 1);
      return d;
    });
    setSelectedItem(null);
  };

  const handleToday = () => {
    setSelectedDate(new Date());
    setSelectedItem(null);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 py-4 md:py-6 lg:px-6">
      <div className="flex-1 overflow-y-auto p-6 grid grid-cols-3 gap-6">
        <div className="col-span-3 lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UrgentFunnelUpdatesComponent />
            <DailyAgendaComponent
              eventsForDay={eventsForDay}
              selectedDate={selectedDate}
            />
          </div>
          <CalendarGridComponent
            eventsForDay={eventsForDay}
            onNextDay={handleNextDay}
            onPrevDay={handlePrevDay}
            onSelectItem={setSelectedItem}
            onToday={handleToday}
            selectedDate={selectedDate}
            selectedItem={selectedItem}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HiringGoalsCard />
            <PipelineTrendsCard />
          </div>
        </div>
        <AiAssistantPanelComponent />
      </div>
    </div>
  );
}
