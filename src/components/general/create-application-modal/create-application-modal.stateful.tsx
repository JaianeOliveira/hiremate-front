import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CreateApplicationSchema,
  CreateApplicationType,
} from "@/schemas/create-application.schema";
import { ApplicationStatusEnum } from "@/types/applications";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";

export function CreateApplicationModalStateful({
  children,
}: PropsWithChildren) {
  const { register, setValue, trigger } = useForm<CreateApplicationType>({
    resolver: zodResolver(CreateApplicationSchema),
    defaultValues: {
      isTalentPool: false,
      status: ApplicationStatusEnum.SENT,
    },
  });

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="w-full max-w-[70vw]">
          <DialogHeader>
            <DialogTitle>Nova candidatura</DialogTitle>
            <DialogDescription>
              Preencha o formulário a seguir para cadastrar uma nova candidatura
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 grid-cols-2 max-h-[40vh] overflow-y-auto p-2">
            <div className="grid gap-3 col-span-2">
              <Label htmlFor="companyName">Empresa</Label>
              <Input {...register("companyName")} />
            </div>
            <div className="grid gap-3 col-span-2">
              <Label htmlFor="jobTitle">Título da vaga</Label>
              <Input {...register("jobTitle")} />
            </div>

            <div className="grid gap-3 col-span-2">
              <Label htmlFor="link">Link da vaga</Label>
              <Input {...register("link")} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="status">Status</Label>

              <Select
                onValueChange={(v) => {
                  setValue("status", v as unknown as ApplicationStatusEnum);
                  trigger("status");
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ApplicationStatusEnum).map((s) => (
                    <SelectItem key={s} value={s.toString()}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="applicationDate">Data da inscrição</Label>
              <Input {...register("applicationDate")} />
            </div>

            <div className="grid gap-3 col-span-2 ">
              <Label htmlFor="contact">Contato</Label>
              <Input {...register("contact")} />
            </div>

            <div className="grid gap-3 col-span-2 ">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea {...register("feedback")} />
            </div>

            <div className="grid gap-3 col-span-2 ">
              <Label htmlFor="notes">Observações</Label>
              <Textarea {...register("notes")} />
            </div>

            <div className="my-3 col-span-2 flex items-center gap-3">
              <Checkbox {...register("isTalentPool")} />
              <Label htmlFor="isTalentPool">Banco de talentos</Label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
