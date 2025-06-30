"use client";

import { CreateApplicationModalStateful } from "@/components/general/create-application-modal/create-application-modal.stateful";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { listApplicationsService } from "@/services/applications/list-applications";
import { mockApplications } from "@/types/applications";
import { ListFilter } from "lucide-react";
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

  useEffect(() => {
    handleFetchApplications();
  }, []);

  return (
    <div
      className={`flex flex-col gap-4 ${
        open ? "p-4" : "py-4 px-[4vw]"
      } transition-all`}
    >
      <div className="flex gap-4 items-center justify-between mb-4">
        <h2 className="text-slate-700 dark:text-slate-200 text-base font-semibold">
          Candidaturas
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <ListFilter strokeWidth={1.5} />
          <span>Filtros</span>
        </Button>
        <CreateApplicationModalStateful>
          <Button className="cursor-pointer" size="sm">
            Nova candidatura
          </Button>
        </CreateApplicationModalStateful>
      </div>
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Enviado</TabsTrigger>
          <TabsTrigger value="rejected">Rejeitado</TabsTrigger>
          <TabsTrigger value="archived">Arquivados</TabsTrigger>
          <TabsTrigger value="talentPool">Banco de talentos</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          {mockApplications.map((application) => (
            <div key={application.id}>
              <p>{application.jobTitle}</p>
              <div>
                <p>{application.companyName}</p>
                <p>Inscrição realizada {application.applicationDate}</p>
                <p>Ultima atualização {application.statusUpdatedAt}</p>
                <p>{application.status}</p>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="rejected">Content</TabsContent>
        <TabsContent value="archived">Content</TabsContent>
        <TabsContent value="talentPool">Content</TabsContent>
      </Tabs>
    </div>
  );
}
