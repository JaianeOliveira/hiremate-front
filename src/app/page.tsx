import { ToggleDarkModeButtonStateful } from "@/components/toggle-dark-mode-button/toggle-dark-mode-button.stateful";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="font-light text-2xl text-blue-500">Hiremate</h1>
      <ToggleDarkModeButtonStateful />
    </div>
  );
}
