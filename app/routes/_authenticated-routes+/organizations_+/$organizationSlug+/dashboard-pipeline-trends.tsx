import { TrendingUpIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function PipelineTrendsCard() {
  const { t } = useTranslation("organizations", {
    keyPrefix: "dashboard.ui",
  });

  return (
    <Card className="flex flex-col justify-between min-h-[180px]">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-muted rounded-full">
            <span className="text-2xl text-muted-foreground">
              <TrendingUpIcon />
            </span>
          </div>
          <div className="min-w-0">
            <CardTitle className="text-base font-semibold text-foreground">
              {t("pipelineTrends.title")}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {t("pipelineTrends.subtitle")}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4 text-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-muted-foreground">
            {t("pipelineTrends.qualifiedCandidatesLabel")}
          </p>
          <p className="font-semibold text-foreground">
            {t("pipelineTrends.qualifiedCandidatesValue")}
          </p>
        </div>
        <div className="flex items-center justify-between mb-1">
          <p className="text-muted-foreground">
            {t("pipelineTrends.interviewsScheduledLabel")}
          </p>
          <p className="font-semibold text-foreground">
            {t("pipelineTrends.interviewsScheduledValue")}
          </p>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {t("pipelineTrends.conversionHint")}
        </p>
      </CardContent>
    </Card>
  );
}
