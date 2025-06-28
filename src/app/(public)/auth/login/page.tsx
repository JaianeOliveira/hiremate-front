import { LoginButton } from "@/app/components/login-button.stateful";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center">
      <h2 className="font-bold text-2xl">Acesse sua conta</h2>

      <div className="flex flex-col gap-2">
        <LoginButton />
      </div>
    </div>
  );
}
