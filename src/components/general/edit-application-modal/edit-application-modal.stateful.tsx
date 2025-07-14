"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSetSearchParams } from "@/hooks/useSetSearchParams";
import { cn } from "@/lib/utils";
import {
  CreateApplicationSchema,
  CreateApplicationType,
} from "@/schemas/create-application.schema";
import {
  EditApplicationRequest,
  editApplicationService,
} from "@/services/applications/edit-application";
import { getUniqueApplicationService } from "@/services/applications/get-unique-application";
import {
  ApplicationStatusEnum,
  ApplicationStatusLabels,
} from "@/types/applications";
import { appQueryParams } from "@/utils/app-query-params";
import { serviceQueryKeys } from "@/utils/service-query-keys";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function EditApplicationModalStateful() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { removeParam } = useSetSearchParams();
  const applicationId = searchParams.get(appQueryParams.editApplication);

  const [open, setOpen] = useState(!!applicationId);

  useEffect(() => {
    setOpen(!!applicationId);
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

      const applicationData = response.data.data;

      form.reset({
        companyName: applicationData?.companyName,
        applicationDate: applicationData?.applicationDate
          ? new Date(applicationData?.applicationDate)
          : new Date(),
        contact: applicationData?.contact,
        feedback: applicationData?.feedback,
        isTalentPool: applicationData?.isTalentPool,
        jobTitle: applicationData?.jobTitle,
        link: applicationData?.link,
        notes: applicationData?.notes,
        status: applicationData?.status,
      });

      return applicationData;
    },
    enabled: Boolean(applicationId),
  });

  const form = useForm<CreateApplicationType>({
    resolver: zodResolver(CreateApplicationSchema),
    defaultValues: {
      isTalentPool: false,
      status: ApplicationStatusEnum.SENT,
      applicationDate: new Date(),
      companyName: "",
      contact: "",
      feedback: "",
      jobTitle: "",
      link: "",
      notes: "",
    },
  });

  const { mutate: editApplication, isPending } = useMutation({
    mutationFn: ({ data, id }: EditApplicationRequest) =>
      editApplicationService({ data, id }),
    onSuccess: () => {
      toast.success("Candidatura editada com sucesso");

      queryClient.invalidateQueries({
        queryKey: ["list-applications"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["list-companies"],
        exact: false,
      });

      form.reset();
      setOpen(false);
    },
    onError: () => {
      toast.error("Não foi possível editar a candidatura");
    },
  });

  function onSubmit(data: CreateApplicationType) {
    editApplication({ data, id: applicationId || "" });
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      removeParam(appQueryParams.editApplication);
    }

    setOpen(open);
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogContent className="lg:!w-[50vw] md:!w-[70vw] !max-w-[80vw] max-h-[90vh]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              onSubmit(data);
            })}
          >
            <DialogHeader>
              <DialogTitle>Editar candidatura</DialogTitle>
              <DialogDescription>
                Preencha o formulário a seguir para editar os dados da
                candidatura
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 grid-cols-2 max-h-[60vh] overflow-y-auto p-2 mt-4">
              <div className="grid gap-3 col-span-2">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex.: Google" {...field} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3 col-span-2">
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título da vaga</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex.: Analista de Dados"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-3 col-span-2">
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link da vaga</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex.: https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-3 col-span-1">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(ApplicationStatusEnum).map((s) => (
                            <SelectItem key={s} value={s.toString()}>
                              {ApplicationStatusLabels[s]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-3 col-span-1">
                <FormField
                  control={form.control}
                  name="applicationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data da inscrição</FormLabel>
                      <>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  dayjs(field.value).format("DD/MM/YYYY")
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                      </>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-3 col-span-2 ">
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contato</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex.: recruiter@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-3 col-span-2 ">
                <FormField
                  control={form.control}
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feedback</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-3 col-span-2 ">
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="my-3 col-span-2 flex items-center gap-3">
                <FormField
                  control={form.control}
                  name="isTalentPool"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Banco de talentos
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                Editar candidatura
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
