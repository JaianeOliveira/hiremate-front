import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useSetSearchParams } from "@/hooks/useSetSearchParams";
import dayjs from "@/lib/dayjs";
import { getUniqueApplicationService } from "@/services/applications/get-unique-application";
import {
  ApplicationStatusEnum,
  ApplicationStatusLabels,
} from "@/types/applications";
import { appQueryParams } from "@/utils/app-query-params";
import { serviceQueryKeys } from "@/utils/service-query-keys";
import { useQuery } from "@tanstack/react-query";
import {
  Building2,
  Calendar,
  Contact,
  History,
  LinkIcon,
  Pen,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const ApplicationOverviewSheetStateful = () => {
  const searchParams = useSearchParams();
  const applicationId =
    searchParams.get(appQueryParams.showApplicationDetails) ?? "";

  const { removeParam } = useSetSearchParams();
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: [serviceQueryKeys.getUniqueApplication, applicationId],
    queryFn: () => getUniqueApplicationService({ id: applicationId }),
  });

  const handleclose = () => {
    removeParam(appQueryParams.showApplicationDetails);
  };

  if (isLoading) {
    return (
      <Sheet modal open={!!applicationId} onOpenChange={handleclose}>
        <SheetContent className="min-w-11/12 md:min-w-10/12 lg:min-w-2/5 px-4 md:px-8">
          <SheetHeader>
            <div className="pb-2 flex items-center gap-2 w-full">
              <Badge>Status</Badge>
              <Button asChild variant="ghost" size="sm">
                <Link href="#">
                  <Pen />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="#">
                  <LinkIcon />
                </Link>
              </Button>
            </div>
            <SheetTitle>
              <Skeleton className="h-5 w-64" />
            </SheetTitle>
            <SheetDescription>
              <Skeleton className="h-3 w-32" />
            </SheetDescription>
          </SheetHeader>

          <div className="grid grid-cols-5 gap-2 w-full text-sm px-4">
            <p className="font-semibold col-span-2 inline-flex gap-2 items-start">
              <Calendar size={16} />
              <span>Data da candidatura</span>
            </p>
            <p className="col-span-3">
              <Skeleton className="h-3 w-32" />
            </p>

            <p className="font-semibold col-span-2 inline-flex gap-2 items-start">
              <History size={16} />
              <span>Ultima atualização</span>
            </p>
            <p className="col-span-3">
              <Skeleton className="h-3 w-32" />
            </p>

            <p className="font-semibold col-span-2 inline-flex gap-2 items-start">
              <Contact size={16} />
              <span>Contato</span>
            </p>
            <p className="col-span-3">
              {" "}
              <Skeleton className="h-3 w-32" />
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-2 px-4 mt-4">
              <p className="text-sm font-semibold">Observações</p>
              <div className="border border-muted rounded-lg p-2 min-h-32 text-muted-foreground bg-muted animate-pulse"></div>
            </div>

            <div className="flex flex-col gap-2 px-4 mt-4">
              <p className="text-sm font-semibold">Feedback</p>
              <div className="border border-muted rounded-lg p-2 min-h-32 text-muted-foreground bg-muted animate-pulse"></div>
            </div>
          </div>
          <SheetFooter className="bg-muted mb-8 rounded-lg h-1/4 max-h-1/4">
            <p className="text-sm font-semibold">Histórico</p>
            <div className="flex-1 overflow-y-auto">
              <p className="text-muted-foreground text-sm italic">Em breve</p>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  if (isSuccess && !data.data.data) {
    return (
      <Sheet modal open={!!applicationId} onOpenChange={handleclose}>
        <SheetContent className="text-muted-foreground flex flex-col items-center justify-center min-w-11/12 md:min-w-10/12 lg:min-w-2/5 px-4 md:px-8">
          <TriangleAlert strokeWidth={1.5} />
          <span className="font-medium">Ops não achei os dados</span>
          <SheetClose>
            <Button className="cursor-pointer" variant="outline">
              Fechar
            </Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet modal open={!!applicationId} onOpenChange={handleclose}>
      <SheetContent className="min-w-11/12 md:min-w-10/12 lg:min-w-2/5 px-4 md:px-8">
        <SheetHeader>
          <div className="pb-2 flex items-center gap-2 w-full">
            <Badge>
              {
                ApplicationStatusLabels[
                  data?.data.data.status as ApplicationStatusEnum
                ]
              }
            </Badge>
            <Button variant="ghost" size="sm" disabled>
              <Pen />
            </Button>

            <Link
              aria-disabled={!data?.data.data.link}
              href={data?.data.data.link || ""}
              target="_blank"
              className="aria-disabled:pointer-events-none"
            >
              <Button
                variant="ghost"
                size="sm"
                disabled={!data?.data.data.link}
              >
                <LinkIcon />
              </Button>
            </Link>
          </div>
          <SheetTitle className="text-lg">
            {data?.data.data.jobTitle}
          </SheetTitle>
          <SheetDescription className="inline-flex gap-2 items-center">
            <Building2 size={16} strokeWidth={1.2} />
            <span>{data?.data.data.companyName}</span>
          </SheetDescription>
        </SheetHeader>

        <div className="grid grid-cols-5 gap-2 w-full text-sm px-4">
          <p className="font-semibold col-span-2 inline-flex gap-2 items-start">
            <Calendar size={16} />
            <span>Data da candidatura</span>
          </p>
          <p className="col-span-3">
            {dayjs(data?.data.data.applicationDate).format("DD/MM/YYYY")},{" "}
            {dayjs().to(dayjs(data?.data.data.applicationDate))}
          </p>

          <p className="font-semibold col-span-2 inline-flex gap-2 items-start">
            <History size={16} />
            <span>Ultima atualização</span>
          </p>
          <p className="col-span-3">
            {dayjs().to(dayjs(data?.data.data.statusUpdatedAt))}
          </p>

          <p className="font-semibold col-span-2 inline-flex gap-2 items-start">
            <Contact size={16} />
            <span>Contato</span>
          </p>
          <p className="col-span-3">{data?.data.data.contact || "-"}</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-2 px-4 mt-4">
            <p className="text-sm font-semibold">Observações</p>
            <div className="border border-muted rounded-lg p-2 min-h-32 text-muted-foreground ">
              <p className="col-span-3 text-sm">
                {data?.data.data.notes || "Nenhuma observação"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 px-4 mt-4">
            <p className="text-sm font-semibold">Feedback</p>
            <div className="border border-muted rounded-lg p-2 min-h-32 text-muted-foreground ">
              <p className="col-span-3 text-sm">
                {data?.data.data.notes || "Nenhum feedback"}
              </p>
            </div>
          </div>
        </div>
        <SheetFooter className="bg-muted mb-8 rounded-lg h-1/4 max-h-1/4">
          <p className="text-sm font-semibold">Histórico</p>
          <div className="flex-1 overflow-y-auto">
            <p className="text-muted-foreground text-sm italic">Em breve</p>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
