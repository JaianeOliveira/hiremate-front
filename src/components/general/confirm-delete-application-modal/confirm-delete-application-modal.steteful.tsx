import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSetSearchParams } from "@/hooks/useSetSearchParams";
import { deletApplicationService } from "@/services/applications/delete-application";
import { getUniqueApplicationService } from "@/services/applications/get-unique-application";
import { ApplicationStatusLabels } from "@/types/applications";
import { appQueryParams } from "@/utils/app-query-params";
import { serviceQueryKeys } from "@/utils/service-query-keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Loader, TriangleAlert } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const ConfirmDeleteApplicationModalStateful = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { removeParam } = useSetSearchParams();

  const applicationId = searchParams.get(appQueryParams.deleteApplication);

  const [isOpen, setIsOpen] = useState(!!applicationId);

  useEffect(() => {
    setIsOpen(!!applicationId);
  }, [applicationId]);

  const {
    data: application,
    isLoading: loadingApplicationData,
    isError: errorOnLoadApplicationData,
  } = useQuery({
    queryKey: [serviceQueryKeys.getUniqueApplication, applicationId],
    queryFn: async () => {
      const response = await getUniqueApplicationService({
        id: applicationId || "",
      });

      return response.data.data;
    },
    enabled: Boolean(applicationId),
  });

  const { isPending, mutateAsync: deleteApplication } = useMutation({
    mutationFn: () => deletApplicationService({ id: applicationId || "" }),
    onSuccess: () => {
      setIsOpen(false);

      setTimeout(() => {
        removeParam(appQueryParams.deleteApplication);

        queryClient.invalidateQueries({
          queryKey: ["list-applications"],
          exact: false,
        });
        queryClient.invalidateQueries({
          queryKey: ["list-companies"],
          exact: false,
        });

        toast.success("Candidatura excluída");
      }, 200);
    },
    onError: () => {
      toast.error("Não foi possível apagar a candidatura");
    },
  });

  const onFinish = () => {
    removeParam(appQueryParams.deleteApplication);
  };

  const handleConfirm = async () => {
    await deleteApplication();
  };

  const handleCancel = () => {
    onFinish();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogTitle>
          Tem certeza que quer excluir a candidatura a seguir?
        </DialogTitle>

        {loadingApplicationData && (
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-accent/50 h-28 animate-pulse">
            <div className="h-3 w-64 rounded-md bg-muted-foreground animate-pulse" />
            <div className="h-2 w-32 rounded-md bg-muted-foreground animate-pulse" />
            <div className="flex items-center gap-2 mt-auto">
              <div className="h-4 w-16 rounded-full bg-muted-foreground animate-pulse "></div>
              <div className="h-2 w-32 rounded-md bg-muted-foreground animate-pulse" />
            </div>
          </div>
        )}

        {errorOnLoadApplicationData && (
          <>
            <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-accent/50 h-28">
              <TriangleAlert size={18} className="stroke-destructive" />
              <p className="text-destructive font-semibold text-sm text-center">
                Algo deu errado!
              </p>
            </div>
            <DialogFooter>
              <Button className="w-full" variant="outline">
                Voltar
              </Button>
            </DialogFooter>
          </>
        )}

        {!loadingApplicationData &&
          !errorOnLoadApplicationData &&
          application && (
            <>
              <div className="p-4 rounded-lg bg-accent/50 ">
                <div>
                  <p className="font-semibold text-sm">
                    {application.jobTitle}
                  </p>
                  <p className="text-xs">{application.companyName}</p>
                </div>

                <div className="flex items-baseline-last gap-2 mt-4 ">
                  <Badge variant="secondary">
                    {ApplicationStatusLabels[application.status]}
                  </Badge>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Criada em{" "}
                    {dayjs(application.applicationDate).format("DD/MM/YYYY")}
                  </p>
                </div>
              </div>
            </>
          )}

        {!errorOnLoadApplicationData && (
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              className="cursor-pointer"
              disabled={
                loadingApplicationData ||
                errorOnLoadApplicationData ||
                isPending
              }
            >
              <span>{isPending ? "Excluindo" : "Excluir"}</span>

              {isPending && <Loader className="animate-spin" />}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
