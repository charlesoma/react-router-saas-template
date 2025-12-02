import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { CalendarEvent, CalendarEventWithLayout } from "./dashboard-utils";
import {
  assignEventLanes,
  CALENDAR_HOURS,
  formatDateLabel,
  formatHour,
  getEventTimeColorClass,
} from "./dashboard-utils";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";

export type SelectedItem =
  | { type: "event"; event: CalendarEvent }
  | { type: "slot"; hour: number }
  | null;

type Props = {
  selectedDate: Date;
  selectedItem: SelectedItem;
  eventsForDay: CalendarEvent[];
  onPrevDay(): void;
  onNextDay(): void;
  onToday(): void;
  onSelectItem(item: SelectedItem): void;
};

export function CalendarGridComponent({
  selectedDate,
  selectedItem,
  eventsForDay,
  onPrevDay,
  onNextDay,
  onToday,
  onSelectItem,
}: Props) {
  const { t } = useTranslation("organizations", {
    keyPrefix: "dashboard.ui",
  });

  const now = new Date();
  const eventsWithLayout: CalendarEventWithLayout[] = useMemo(
    () => assignEventLanes(eventsForDay),
    [eventsForDay],
  );

  return (
    <Card className="grow flex flex-col p-5 max-h-[300px] sm:max-h-[360px] overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button
            className="text-muted-foreground cursor-pointer hover:text-foreground"
            onClick={onPrevDay}
            size="icon"
            type="button"
            variant="ghost"
          >
            <span>
              <ChevronLeftIcon />
            </span>
          </Button>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {formatDateLabel(selectedDate)}
          </h3>
          <Button
            className="text-slate-500 cursor-pointer dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            onClick={onNextDay}
            size="icon"
            type="button"
            variant="ghost"
          >
            <span>
              <ChevronRightIcon />
            </span>
          </Button>
        </div>
        <Button
          className="text-sm cursor-pointer font-semibold bg-muted text-foreground px-4 py-2 rounded-md hover:bg-muted/80 transition-colors"
          onClick={onToday}
          type="button"
        >
          <span className="truncate max-w-full overflow-hidden text-ellipsis">
            {t("calendar.today")}
          </span>
        </Button>
      </div>
      <div className="relative mt-2">
        <ScrollArea className="w-full text-xs text-slate-400 h-[144px] sm:h-[184px]">
          <div
            className="relative"
            style={{ minHeight: `${CALENDAR_HOURS.length * 3}rem` }}
          >
            {/* Hour rows with clickable slots */}
            <div className="flex flex-col">
              {CALENDAR_HOURS.map((hour) => {
                const isSelectedSlot =
                  selectedItem?.type === "slot" && selectedItem.hour === hour;

                const hasEventsInSlot = eventsForDay.some(
                  (event) => event.startHour <= hour && hour < event.endHour,
                );

                const slotColorClass = isSelectedSlot
                  ? "bg-muted"
                  : hasEventsInSlot
                    ? "bg-muted/50"
                    : "";

                return (
                  <div
                    className="flex border-b border-slate-100 dark:border-slate-800 last:border-b-0"
                    key={hour}
                    style={{ height: "3rem" }}
                  >
                    <div className="w-16 shrink-0 flex items-start -mt-1 pt-3 pl-0.5">
                      <p>{formatHour(hour)}</p>
                    </div>
                    <Button
                      aria-label={t("calendar.slotLabel", {
                        time: formatHour(hour),
                      })}
                      aria-pressed={isSelectedSlot}
                      className={`flex-1 h-full px-4 flex items-center text-left transition-colors ${slotColorClass}`}
                      onClick={() => {
                        if (
                          selectedItem?.type === "slot" &&
                          selectedItem.hour === hour
                        ) {
                          onSelectItem(null);
                        } else {
                          onSelectItem({ hour, type: "slot" });
                        }
                      }}
                      type="button"
                      variant="calendar"
                    />
                  </div>
                );
              })}
            </div>

            {/* Events overlay */}
            <div className="pointer-events-none absolute inset-0 flex">
              <div className="w-16 shrink-0" />
              <div className="flex-1 relative">
                {eventsWithLayout.map((event) => {
                  const startIndex = CALENDAR_HOURS.indexOf(event.startHour);
                  const endIndex = CALENDAR_HOURS.indexOf(event.endHour);

                  if (
                    startIndex === -1 ||
                    endIndex === -1 ||
                    endIndex <= startIndex
                  ) {
                    return null;
                  }

                  const top = startIndex * 3;
                  const height = (endIndex - startIndex) * 3;

                  const isSelectedEvent =
                    selectedItem?.type === "event" &&
                    selectedItem.event.id === event.id;

                  const timeColorClass = getEventTimeColorClass(event, now);

                  const widthPercent = 100 / event.laneCount;
                  const leftPercent = widthPercent * event.lane;

                  return (
                    <div
                      className="pointer-events-auto"
                      key={event.id}
                      style={{
                        height: `${height}rem`,
                        left: `calc(${leftPercent}% + 0.5rem)`,
                        position: "absolute",
                        top: `${top}rem`,
                        width: `calc(${widthPercent}% - 1rem)`,
                      }}
                    >
                      <Button
                        className={`h-full w-full rounded-r-md rounded-l-none flex flex-col justify-start items-start border-l-4 p-2 text-xs cursor-pointer ${timeColorClass} ${
                          isSelectedEvent
                            ? "ring-2 ring-offset-1 ring-primary/60 dark:ring-primary/80"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isSelectedEvent) {
                            onSelectItem(null);
                          } else {
                            onSelectItem({ event, type: "event" });
                          }
                        }}
                        type="button"
                        variant="calendar"
                      >
                        <p className="font-semibold truncate max-w-full overflow-hidden text-ellipsis">
                          {event.title}
                        </p>
                        <p className="opacity-80 -mt-1.5">
                          {`${formatHour(event.startHour)} - ${formatHour(
                            event.endHour,
                          )}`}
                        </p>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollArea>
        {selectedItem && (
          <div className="pointer-events-auto absolute inset-x-0 bottom-0 rounded-md border border-border bg-muted p-3 text-xs text-muted-foreground">
            {selectedItem.type === "slot" && (
              <p>
                {t("calendar.selectedSlotLabel")}{" "}
                <span className="font-semibold">
                  {formatHour(selectedItem.hour)}
                </span>
              </p>
            )}
            {selectedItem.type === "event" && (
              <div>
                <p className="font-semibold mb-1">{selectedItem.event.title}</p>
                <p>
                  {t("calendar.timeLabel")}{" "}
                  {formatHour(selectedItem.event.startHour)} -{" "}
                  {formatHour(selectedItem.event.endHour)}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
