import { GoalIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function HiringGoalsCard() {
  const { t } = useTranslation("organizations", {
    keyPrefix: "dashboard.ui",
  });

  return (
    <Card className="flex flex-col justify-between min-h-[180px]">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-muted rounded-full">
            <span className="text-2xl text-muted-foreground">
              <GoalIcon />
            </span>
          </div>
          <div className="min-w-0">
            <CardTitle className="text-base font-semibold text-foreground">
              {t("hiringGoals.title")}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {t("hiringGoals.subtitle")}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4 text-sm">
        <div className="flex items-baseline justify-between mb-2">
          <p className="text-muted-foreground">
            {t("hiringGoals.rolesFilledLabel")}
          </p>
          <p className="font-semibold text-foreground">
            {t("hiringGoals.rolesFilledValue")}
          </p>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted">
          <div className="h-full w-2/3 rounded-full bg-purple-600 dark:bg-purple-500" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {t("hiringGoals.progressHint")}
        </p>
      </CardContent>
    </Card>
  );
}
