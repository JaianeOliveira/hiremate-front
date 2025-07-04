"use client";

import { ApplicationsTable } from "@/components/general/applications-table";
import { useSidebar } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { listApplicationsService } from "@/services/applications/list-applications";
import { useEffect, useState } from "react";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);

  const { open } = useSidebar();

  const handleFetchApplications = async () => {
    try {
      const response = await listApplicationsService();
      setApplications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(applications);

  useEffect(() => {
    handleFetchApplications();
  }, []);

  return (
    <div
      className={`max-h-screen overflow-hidden flex flex-col gap-4 ${
        open ? "p-4" : "py-4 px-[4vw]"
      } transition-all`}
    >
      <div className="flex gap-4 items-center justify-between mb-4">
        <h2 className="text-neutral-700 dark:text-neutral-200 text-base font-semibold">
          Candidaturas
        </h2>
      </div>

      <Tabs
        defaultValue="runing"
        className="flex flex-col flex-1 overflow-auto"
      >
        <TabsList>
          <TabsTrigger value="runing">Em andamento</TabsTrigger>
          <TabsTrigger value="rejected">Rejeitado</TabsTrigger>
          <TabsTrigger value="archived">Arquivados</TabsTrigger>
          <TabsTrigger value="talentPool">Banco de talentos</TabsTrigger>
        </TabsList>
        <TabsContent
          value="runing"
          className="flex-1 flex flex-col gap-2 overflow-auto"
        >
          <ApplicationsTable />
        </TabsContent>
        <TabsContent value="rejected">
          <ApplicationsTable />
        </TabsContent>
        <TabsContent value="archived">
          <ApplicationsTable />
        </TabsContent>
        <TabsContent value="talentPool">
          <ApplicationsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
