import { LoginButton } from "@/components/general/login-button.stateful";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center dark:bg-neutral-950">
      <div className="flex flex-col items-center text-center">
        <h1 className="uppercase font-semibold text-blue-500 text-lg">
          HireMate
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-200">
          Entre com alguma rede social{" "}
        </p>
      </div>

      <div className="w-6 h-[1px] border-b border-b-neutral-400"></div>

      <div className="flex flex-col gap-2">
        <LoginButton />
      </div>
    </div>
  );
}
