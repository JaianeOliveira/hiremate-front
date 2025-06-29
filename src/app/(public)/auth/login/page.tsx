import { LoginButton } from "@/components/login-button.stateful";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center dark:bg-slate-950">
      <div className="flex flex-col gap-4 px-4 py-8 rounded-xl shadow-sm items-center bg-slate-100/50 dark:bg-slate-900/50 md:min-w-[300px]">
        <div className="flex flex-col items-center text-center">
          <h1 className="uppercase font-semibold text-blue-500">HireMate</h1>
          <p className="text-xs text-slate-600 dark:text-slate-200">
            Entre com alguma rede social{" "}
          </p>
        </div>

        <div className="w-6 h-[1px] border-b border-b-slate-400"></div>

        <div className="flex flex-col gap-2">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
