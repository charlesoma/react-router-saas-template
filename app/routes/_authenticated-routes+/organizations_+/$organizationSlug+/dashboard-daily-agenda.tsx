import { ClockIcon, ClockPlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { CalendarEvent } from "./dashboard-utils";
import { formatDateLabel, formatHour } from "./dashboard-utils";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";

type Props = {
  selectedDate: Date;
  eventsForDay: CalendarEvent[];
};

export function DailyAgendaComponent({ selectedDate, eventsForDay }: Props) {
  const { t } = useTranslation("organizations", {
    keyPrefix: "dashboard.ui",
  });

  return (
    <Card className="gap-0">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          {t("dailyAgenda.title")} - {formatDateLabel(selectedDate)}
        </CardTitle>
        <span className="text-lg">
          <ClockPlusIcon />
        </span>
      </CardHeader>
      <CardContent>
        {eventsForDay.length === 0 ? (
          <div className="rounded-md border border-dashed border-border bg-muted px-4 py-3 text-xs text-muted-foreground">
            {t("dailyAgenda.empty")}
          </div>
        ) : (
          <div className="max-h-48 overflow-y-auto pr-1">
            <ul className="space-y-3">
              {eventsForDay.map((event) => (
                <li className="flex items-center gap-3" key={event.id}>
                  <Checkbox
                    aria-label={t("dailyAgenda.markDoneLabel", {
                      title: event.title,
                    })}
                    className="size-5"
                  />
                  <div className="flex-1 min-w-0 text-sm">
                    <p className="font-medium text-foreground truncate">
                      {event.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatHour(event.startHour)} -{" "}
                      {formatHour(event.endHour)}
                    </p>
                  </div>
                  <span className="text-lg text-muted-foreground">
                    <ClockIcon />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
