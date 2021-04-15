import { render, screen, cleanup } from "@testing-library/react";
import Follow from "../Follow";

test("Sidebar shows title", () => {
  render(<Follow />);
  const sidebarTitle = screen.getByTestId("test-sidebarTitle");
  expect(sidebarTitle).toHaveTextContent("People you may know");
});

afterEach(() => {
  cleanup();
});
