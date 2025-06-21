import Page from "@/app/page";
import { render, screen } from "@testing-library/react";

test("renderiza a home com nome do app", () => {
  render(<Page />);
  expect(screen.getByText("Hiremate")).toBeInTheDocument();
});
