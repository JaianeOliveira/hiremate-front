import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useSetSearchParams } from "@/hooks/useSetSearchParams";
import dayjs from "@/lib/dayjs";
import { listApplicationsService } from "@/services/applications/list-applications";
import { listCompaniesService } from "@/services/applications/list-companies";
import {
  Application,
  ApplicationStatusEnum,
  ApplicationStatusGroup,
  ApplicationStatusGroupEnum,
  ApplicationStatusLabels,
} from "@/types/applications";
import { Pagination } from "@/types/pagination";
import { appQueryParams } from "@/utils/app-query-params";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ApplicationOverviewSheetStateful } from "../application-overview-sheet/application-overview-sheet.stateful";
import { ConfirmDeleteApplicationModalStateful } from "../confirm-delete-application-modal/confirm-delete-application-modal.steteful";
import { CreateApplicationModalStateful } from "../create-application-modal/create-application-modal.stateful";
import { EditApplicationModalStateful } from "../edit-application-modal/edit-application-modal.stateful";

type ApplicationsListProps = {
  statusGroup: ApplicationStatusGroupEnum;
};

export const ApplicationsList = ({ statusGroup }: ApplicationsListProps) => {
  const searchParams = useSearchParams();
  const { setParam, removeParam } = useSetSearchParams();

  const selectedCompanies =
    searchParams.get(appQueryParams.selectedCompanies)?.split(",") ?? [];
  const selectedStatus =
    searchParams.get(appQueryParams.selectedStatus)?.split(",") ?? [];

  const [pagination, setPagination] = useState<Pagination>({
    limit: 10,
    page: 1,
    total: 0,
    total_pages: 1,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectCompany = (company: string, checked: boolean) => {
    const newSelectedCompanies = checked
      ? [...selectedCompanies, company]
      : selectedCompanies?.filter((c) => c !== company);

    setParam(appQueryParams.selectedCompanies, newSelectedCompanies.join(","));
  };

  const handleSelectStatus = (
    status: ApplicationStatusEnum,
    checked: boolean
  ) => {
    const newSelectedStatus = checked
      ? [...selectedStatus, status]
      : selectedStatus?.filter((c) => c !== status);

    setParam(appQueryParams.selectedStatus, newSelectedStatus.join(","));
  };

  const clearSelectedStatus = () => {
    removeParam(appQueryParams.selectedStatus);
  };

  const handleEditAplication = (application: Application) => {
    setParam(appQueryParams.editApplication, application.id);
  };

  const handleDeleteApplications = (application: Application) => {
    setParam(appQueryParams.deleteApplication, application.id);
  };

  const handleViewApplicationDetails = (application: Application) => {
    setParam(appQueryParams.showApplicationDetails, application.id);
  };

  const { data: companies } = useQuery({
    queryKey: ["list-companies"],
    queryFn: () => listCompaniesService({}),
  });

  const { data: applications, isLoading } = useQuery({
    queryKey: [
      "list-applications",
      pagination,
      {
        company: selectedCompanies,
        isTalentPool: Boolean(
          statusGroup === ApplicationStatusGroupEnum.TALENT_POOL
        ),
        status: selectedStatus.length
          ? (selectedStatus as ApplicationStatusEnum[])
          : ApplicationStatusGroup[statusGroup],
      },
    ],
    queryFn: async () => {
      const data = await listApplicationsService({
        filters: {
          company: selectedCompanies,
          isTalentPool: Boolean(
            statusGroup === ApplicationStatusGroupEnum.TALENT_POOL
          ),
          status: selectedStatus.length
            ? (selectedStatus as ApplicationStatusEnum[])
            : ApplicationStatusGroup[statusGroup],
        },
        pagination,
      });

      setPagination(data.data.pagination);

      return data;
    },
  });

  const filteredApps = useMemo(() => {
    if (!applications) return [];
    const term = searchTerm.toLowerCase().trim();
    if (!term) return applications.data.data;
    return applications.data.data.filter((app: Application) => {
      return (
        app.jobTitle.toLowerCase().includes(term) ||
        app.companyName.toLowerCase().includes(term)
      );
    });
  }, [applications, searchTerm]);

  useEffect(() => {
    clearSelectedStatus();
  }, [statusGroup]);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        <CreateApplicationModalStateful>
          <Button className="cursor-pointer" size="sm">
            Nova candidatura
          </Button>
        </CreateApplicationModalStateful>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="">
              {selectedCompanies.length > 0 && (
                <span className="bg-primary text-primary-foreground aspect-square h-4 w-4 rounded-full text-xs">
                  {selectedCompanies.length}
                </span>
              )}
              <span>Empresa</span> <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {companies?.data.data.map((company) => {
              return (
                <DropdownMenuCheckboxItem
                  key={company}
                  className="capitalize"
                  checked={selectedCompanies.includes(company)}
                  onCheckedChange={(checked) => {
                    handleSelectCompany(company, checked);
                  }}
                >
                  {company}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="">
              {selectedStatus.length > 0 && (
                <span className="bg-primary text-primary-foreground aspect-square h-4 w-4 rounded-full text-xs">
                  {selectedStatus.length}
                </span>
              )}
              <span>Status</span> <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {ApplicationStatusGroup[statusGroup].map((status) => {
              return (
                <DropdownMenuCheckboxItem
                  key={status}
                  className="capitalize"
                  checked={selectedStatus.includes(status)}
                  onCheckedChange={(checked) => {
                    handleSelectStatus(status, checked);
                  }}
                >
                  {ApplicationStatusLabels[status]}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <Input
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="md:max-w-sm"
        />
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-3 w-32" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-2 w-24" />
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <Skeleton className="w-3/4 h-2" />
              <Skeleton className="w-2/4 h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-3 w-32" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-2 w-24" />
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <Skeleton className="w-3/4 h-2" />
              <Skeleton className="w-2/4 h-2" />
            </CardContent>
          </Card>
        </div>
      ) : filteredApps.length > 0 ? (
        <div className="flex flex-col gap-4 py-4 flex-1">
          {filteredApps.map((application) => (
            <Card
              key={application.id}
              onClick={() => handleViewApplicationDetails(application)}
            >
              <CardHeader>
                <CardTitle>{application.jobTitle}</CardTitle>
                <CardDescription>{application.companyName}</CardDescription>

                <CardAction>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Mais opções</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => {
                          handleViewApplicationDetails(application);
                        }}
                      >
                        Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild disabled={!application.link}>
                        <Link target="_blank" href={application.link || ""}>
                          Ir para o link da vaga
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleEditAplication(application)}
                      >
                        Editar
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => {
                          handleDeleteApplications(application);
                        }}
                      >
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardAction>
              </CardHeader>

              <CardContent className="text-sm space-y-2 ">
                <p className="">
                  Candidatura realizada{" "}
                  {dayjs(application.applicationDate).fromNow()}
                </p>

                <div className="flex flex-wrap-reverse items-baseline gap-2 ">
                  <Badge>{ApplicationStatusLabels[application.status]}</Badge>
                  <p>
                    Ultima atualização{" "}
                    {dayjs(application.statusUpdatedAt).fromNow()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center px-4 py-8 justify-center text-center">
          <p className="italic text-muted-foreground">
            Nenhuma candidatura encontrada
          </p>
        </div>
      )}

      <div className="flex items-center justify-start space-x-2 py-4">
        <div className="space-x-2 flex items-center">
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page <= 1}
            onClick={() => {
              setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
            }}
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </Button>
          <div className="text-muted-foreground flex-1 text-sm">
            Página {pagination.page} de {pagination.total_pages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
            }
            disabled={pagination.page == pagination.total_pages}
          >
            <ChevronRight size={16} strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      <ConfirmDeleteApplicationModalStateful />
      <ApplicationOverviewSheetStateful />
      <EditApplicationModalStateful />
    </div>
  );
};
