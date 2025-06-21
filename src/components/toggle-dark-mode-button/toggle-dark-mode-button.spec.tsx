import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MatchMediaMock from "jest-matchmedia-mock";
import { ToggleDarkModeButtonStateful } from "./toggle-dark-mode-button.stateful";

describe("ToggleDarkModeButtonStateful", () => {
  let matchMedia: MatchMediaMock;

  beforeEach(() => {
    matchMedia = new MatchMediaMock();
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  afterEach(() => {
    matchMedia.clear();
  });

  it("usa dark mode se preferencia do sistema for dark", () => {
    matchMedia.useMediaQuery("(prefers-color-scheme: dark)");
    render(<ToggleDarkModeButtonStateful />);
    expect(document.documentElement).toHaveClass("dark"); // valida classe :contentReference[oaicite:6]{index=6}
  });

  it("toggle atualiza classe e localStorage", async () => {
    render(<ToggleDarkModeButtonStateful />);
    const btn = screen.getByRole("button");
    const user = userEvent.setup();

    // inicialmente sem dark
    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBeNull();

    // liga dark
    await user.click(btn);
    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("dark");

    // desliga dark
    await user.click(btn);
    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("light");
  }, 10000); // aumenta timeout só neste teste :contentReference[oaicite:7]{index=7}
});
