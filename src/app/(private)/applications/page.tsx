"use client";

import { ApplicationsList } from "@/components/general/applications-list/applications-list";
import { ApplicationsTable } from "@/components/general/applications-table/applications-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { ApplicationStatusGroupEnum } from "@/types/applications";
import { useState } from "react";

export default function ApplicationsPage() {
  const isMobile = useIsMobile();

  const [statusGroup, setStatusGroup] = useState<ApplicationStatusGroupEnum>(
    ApplicationStatusGroupEnum.RUNNING
  );

  const renderPageContent = (statusGroup: ApplicationStatusGroupEnum) => {
    return isMobile ? (
      <ApplicationsList statusGroup={statusGroup} />
    ) : (
      <ApplicationsTable statusGroup={statusGroup} />
    );
  };

  return (
    <div
      className={`max-h-screen overflow-hidden flex flex-col gap-4 transition-all`}
    >
      <div className="flex gap-4 items-center justify-between mb-4">
        <h2 className="text-neutral-700 dark:text-neutral-200 text-base font-semibold">
          Candidaturas
        </h2>
      </div>

      <Tabs
        className="flex flex-col flex-1 overflow-auto"
        value={statusGroup}
        onValueChange={(v: string) =>
          setStatusGroup(v as ApplicationStatusGroupEnum)
        }
        orientation={isMobile ? "vertical" : "horizontal"}
      >
        <TabsList>
          <TabsTrigger value={ApplicationStatusGroupEnum.RUNNING}>
            Em andamento
          </TabsTrigger>
          <TabsTrigger value={ApplicationStatusGroupEnum.REJECTED}>
            Rejeitado
          </TabsTrigger>
          <TabsTrigger value={ApplicationStatusGroupEnum.ARCHIVED}>
            Arquivados
          </TabsTrigger>
          <TabsTrigger value={ApplicationStatusGroupEnum.TALENT_POOL}>
            Banco de talentos
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value={ApplicationStatusGroupEnum.RUNNING}
          className="flex-1 flex flex-col gap-2 overflow-auto"
        >
          {renderPageContent(statusGroup)}
        </TabsContent>
        <TabsContent value={ApplicationStatusGroupEnum.REJECTED}>
          {renderPageContent(statusGroup)}
        </TabsContent>
        <TabsContent value={ApplicationStatusGroupEnum.ARCHIVED}>
          {renderPageContent(statusGroup)}
        </TabsContent>
        <TabsContent value={ApplicationStatusGroupEnum.TALENT_POOL}>
          {renderPageContent(statusGroup)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
