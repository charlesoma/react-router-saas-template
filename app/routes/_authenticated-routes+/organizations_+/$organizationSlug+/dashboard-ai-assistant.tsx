import {
  BotIcon,
  CalendarCheckIcon,
  NotepadTextIcon,
  SendHorizonalIcon,
  SendToBackIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Field, FieldContent } from "~/components/ui/field";
import { Input } from "~/components/ui/input";

export function AiAssistantPanelComponent() {
  const { t } = useTranslation("organizations", {
    keyPrefix: "dashboard.ui",
  });

  return (
    <Card className="col-span-3 lg:col-span-1 flex flex-col">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          {t("aiAssistant.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="grow flex flex-col gap-4 text-sm overflow-y-auto">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-purple-600 dark:bg-purple-500">
            <span className="text-lg text-white">
              <BotIcon />
            </span>
          </div>
          <div className="bg-muted p-3 rounded-lg rounded-tl-none">
            <p>{t("aiAssistant.greeting")}</p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <div className="bg-purple-600 dark:bg-purple-500 text-white p-3 rounded-lg rounded-br-none">
            <p>{t("aiAssistant.userExample")}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-purple-600 dark:bg-purple-500">
            <span className="text-lg text-white">
              <BotIcon />
            </span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg rounded-tl-none">
            <p>{t("aiAssistant.reply")}</p>
          </div>
        </div>
      </CardContent>
      <CardContent className="border-t border-border pt-4">
        <Field>
          <FieldContent>
            <div className="relative">
              <Input
                aria-label={t("aiAssistant.inputPlaceholder")}
                className="pr-12 pl-4 py-5 text-sm"
                placeholder={t("aiAssistant.inputPlaceholder")}
                type="text"
              />
              <Button
                className="absolute cursor-pointer right-1 top-1/2 -translate-y-1/2 bg-slate-700 dark:bg-slate-600 text-white rounded-md h-9 w-9 flex items-center justify-center hover:bg-slate-800 dark:hover:bg-slate-500 transition-colors"
                size="icon"
                variant="ghost"
              >
                <span className="text-lg">
                  <SendHorizonalIcon />
                </span>
              </Button>
            </div>
          </FieldContent>
        </Field>
        <div className="mt-4">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            {t("aiAssistant.contextualActionsTitle")}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              className="flex cursor-pointer items-center justify-start gap-2.5 text-sm p-2 rounded-md bg-muted text-foreground hover:bg-muted/80 transition-colors"
              variant="ghost"
            >
              <span className="text-base">
                <CalendarCheckIcon />
              </span>
              <span className="truncate max-w-full overflow-hidden text-ellipsis">
                {t("aiAssistant.actions.scheduleInterview")}
              </span>
            </Button>
            <Button
              className="flex cursor-pointer items-center justify-start gap-2.5 text-sm p-2 rounded-md bg-muted text-foreground hover:bg-muted/80 transition-colors"
              variant="ghost"
            >
              <span className="text-base">
                <NotepadTextIcon />
              </span>
              <span className="truncate max-w-full overflow-hidden text-ellipsis">
                {t("aiAssistant.actions.summarize")}
              </span>
            </Button>
            <Button
              className="flex cursor-pointer items-center justify-start gap-2.5 text-sm p-2 rounded-md bg-muted text-foreground hover:bg-muted/80 transition-colors"
              variant="ghost"
            >
              <span className="text-base">
                <SendHorizonalIcon />
              </span>
              <span className="truncate max-w-full overflow-hidden text-ellipsis">
                {t("aiAssistant.actions.sendToMarketplace")}
              </span>
            </Button>
            <Button
              className="flex cursor-pointer items-center justify-start gap-2.5 text-sm p-2 rounded-md bg-muted text-foreground hover:bg-muted/80 transition-colors"
              variant="ghost"
            >
              <span className="text-base">
                <SendToBackIcon />
              </span>
              <span className="truncate max-w-full overflow-hidden text-ellipsis">
                {t("aiAssistant.actions.moveToNextStage")}
              </span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
