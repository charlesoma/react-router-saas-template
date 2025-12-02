import { BellRingIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function UrgentFunnelUpdatesComponent() {
  const { t } = useTranslation("organizations", {
    keyPrefix: "dashboard.ui",
  });

  return (
    <Card className="gap-0">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          {t("urgentFunnel.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-4 rounded-md border border-border">
          <div className="flex items-start gap-3">
            <span className="text-xl mt-1 text-purple-600 dark:text-purple-300">
              <BellRingIcon />
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-foreground">
                Offer Pending for Sarah Miller
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Awaiting offer acceptance for the Senior Product Manager role.
                Deadline: EOD.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 px-2 py-1 rounded-full">
                  {t("urgentFunnel.priorityHigh")}
                </span>
                <Button
                  className="text-sm font-medium text-purple-600 dark:text-purple-300 cursor-pointer hover:underline min-w-0"
                  variant="ghost"
                >
                  <span className="truncate max-w-full overflow-hidden text-ellipsis">
                    {t("urgentFunnel.sendReminder")}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
