"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listApplicationsService } from "@/services/applications/list-applications";
import { useEffect, useState } from "react";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);

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
    <div className="flex flex-col gap-8 py-8 px-[8vw]">
      <div className="flex gap-4 items-center justify-between">
        <h2 className="text-slate-700">Acompanhamento de candidaturas</h2>

        <Button className="text-xs cursor-pointer" size="sm">
          Nova candidatura
        </Button>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableHead>Título da vaga</TableHead>
              <TableHead>Data de candidatura</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ultima atualização</TableHead>
              <TableHead>Link </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
