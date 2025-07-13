"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSetSearchParams } from "@/hooks/useSetSearchParams";
import { listApplicationsService } from "@/services/applications/list-applications";
import { listCompaniesService } from "@/services/applications/list-companies";
import {
  type Application,
  ApplicationStatusEnum,
  ApplicationStatusGroup,
  ApplicationStatusGroupEnum,
  ApplicationStatusLabels,
} from "@/types/applications";
import type { Pagination } from "@/types/pagination";
import { appQueryParams } from "@/utils/app-query-params";
import { useQuery } from "@tanstack/react-query";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ConfirmDeleteApplicationModalStateful } from "../confirm-delete-application-modal/confirm-delete-application-modal.steteful";
import { CreateApplicationModalStateful } from "../create-application-modal/create-application-modal.stateful";

type ApplicationsTableProps = {
  statusGroup: ApplicationStatusGroupEnum;
};

export const ApplicationsTable = ({ statusGroup }: ApplicationsTableProps) => {
  const searchParams = useSearchParams();
  const columns: ColumnDef<Application>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Selecionar todos"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Selecionar"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 1,
      },

      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant="secondary">
            {
              ApplicationStatusLabels[
                row.getValue("status") as ApplicationStatusEnum
              ]
            }
          </Badge>
        ),
        size: 2,
      },
      {
        accessorKey: "companyName",
        header: () => "Empresa",
        cell: ({ row }) => <div>{row.getValue("companyName")}</div>,
        size: 3,
      },
      {
        accessorKey: "jobTitle",
        header: () => "Título da vaga",
        cell: ({ row }) => <div>{row.getValue("jobTitle")}</div>,
        size: 4,
      },
      {
        accessorKey: "applicationDate",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0"
          >
            Data de inscrição
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => {
          const value = row.getValue("applicationDate");

          const formatted = dayjs(
            value as string | number | Date | null | undefined
          ).format("DD/MM/YYYY");

          return <div>{formatted}</div>;
        },
        size: 2,
      },
      {
        accessorKey: "statusUpdatedAt",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0"
          >
            <span>Ultima atualização</span>
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => {
          const value = row.getValue("statusUpdatedAt");

          const formatted = dayjs(
            value as string | number | Date | null | undefined
          ).format("DD/MM/YYYY");

          return <div>{formatted}</div>;
        },
        size: 2,
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const application = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Mais opções</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mais opções</DropdownMenuLabel>
                <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                <DropdownMenuItem asChild disabled={!application.link}>
                  <Link target="_blank" href={application.link || ""}>
                    Ir para o link da vaga
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Editar</DropdownMenuItem>

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
          );
        },
        size: 1,
      },
    ],
    []
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [pagination, setPagination] = useState<Pagination>({
    limit: 10,
    page: 1,
    total: 0,
    total_pages: 0,
  });

  const selectedCompanies =
    searchParams.get(appQueryParams.selectedCompanies)?.split(",") ?? [];
  const selectedStatus =
    searchParams.get(appQueryParams.selectedStatus)?.split(",") ?? [];

  const { setParam, removeParam } = useSetSearchParams();

  const handleDeleteApplications = (application: Application) => {
    setParam(appQueryParams.deleteApplication, application.id);
  };

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
    queryFn: () =>
      listApplicationsService({
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
      }),
  });

  useEffect(() => {
    clearSelectedStatus();
  }, [statusGroup]);

  const table = useReactTable({
    data: applications?.data.data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({
              pageIndex: pagination.page - 1,
              pageSize: pagination.limit,
            })
          : updater;
      setPagination((p) => ({ ...p, page: newState.pageIndex + 1 }));
    },
    manualPagination: true,
    pageCount: pagination.total_pages,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: pagination?.page - 1,
        pageSize: pagination?.limit,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4 flex-wrap">
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
          <DropdownMenuContent align="end">
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
          <DropdownMenuContent align="end">
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
          value={
            (table.getColumn("jobTitle")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("jobTitle")?.setFilterValue(event.target.value)
          }
          className="md:max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isLoading ? (
        <div className="rounded-md border animate-pulse">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
                  {columns.map((col, i) => (
                    <TableCell key={i}>
                      <div className="h-6 bg-gray-200 rounded"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Nenhuma candidatura encontrada
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-muted-foreground flex-1 text-sm">
              {table.getFilteredSelectedRowModel().rows.length} de{" "}
              {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
            </div>

            <div className="space-x-2 flex items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft size={16} strokeWidth={1.5} />
              </Button>
              <div className="text-muted-foreground flex-1 text-sm">
                Página{" "}
                {table.getPageCount() === 0
                  ? 0
                  : table.getState().pagination.pageIndex + 1}{" "}
                de {table.getPageCount()}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight size={16} strokeWidth={1.5} />
              </Button>
            </div>
          </div>
        </>
      )}

      <ConfirmDeleteApplicationModalStateful />
    </div>
  );
};
