/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import MatchMediaMock from "jest-matchmedia-mock";
import {
  applyDarkClass,
  getInitialDarkMode,
  ToggleDarkModeButtonStateful,
} from "./toggle-dark-mode-button.stateful";

describe("Funções Puras", () => {
  let matchMedia: MatchMediaMock;

  beforeEach(() => {
    matchMedia = new MatchMediaMock();
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });
  afterEach(() => {
    matchMedia.clear();
  });

  it("getInitialDarkMode retorna true se localStorage='dark'", () => {
    localStorage.setItem("theme", "dark");
    expect(getInitialDarkMode()).toBe(true);
  });

  it("getInitialDarkMode retorna false se localStorage='light'", () => {
    localStorage.setItem("theme", "light");
    expect(getInitialDarkMode()).toBe(false);
  });

  it("getInitialDarkMode usa matchMedia como fallback", () => {
    matchMedia.useMediaQuery("(prefers-color-scheme: dark)");
    expect(getInitialDarkMode()).toBe(true);

    matchMedia.useMediaQuery("(prefers-color-scheme: light)");
    expect(getInitialDarkMode()).toBe(false);
  });

  it("applyDarkClass adiciona e remove classe .dark", () => {
    applyDarkClass(true);
    expect(document.documentElement).toHaveClass("dark");
    applyDarkClass(false);
    expect(document.documentElement).not.toHaveClass("dark");
  });
});

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

  it("inicia em dark mode se sistema prefere dark e sem localStorage", () => {
    matchMedia.useMediaQuery("(prefers-color-scheme: dark)");
    render(<ToggleDarkModeButtonStateful />);
    expect(document.documentElement).toHaveClass("dark");

    const svg = screen.getByRole("button").querySelector("svg")!;
    expect(svg).toHaveAttribute("stroke-width", "2");
  });

  it("inicia em light mode se sistema prefere light e sem localStorage", () => {
    matchMedia.useMediaQuery("(prefers-color-scheme: light)");
    render(<ToggleDarkModeButtonStateful />);
    expect(document.documentElement).not.toHaveClass("dark");

    const svg = screen.getByRole("button").querySelector("svg")!;
    expect(svg).toHaveAttribute("stroke-width", "1.2");
  });

  it("toggle alterna classe e localStorage rapidamente", () => {
    render(<ToggleDarkModeButtonStateful />);
    const btn = screen.getByRole("button");

    fireEvent.click(btn);
    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("dark");

    fireEvent.click(btn);
    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
