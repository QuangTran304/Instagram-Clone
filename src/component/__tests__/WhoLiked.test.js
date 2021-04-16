import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import PopUpLike from "../PopUpLike";


test("Who-liked-post button showed up", () => {
  render(<PopUpLike />);
  const people = screen.getByTestId("test-likedPeople");

  expect(people).toBeInTheDocument();
  expect(people.innerHTML).toContain("people");
});

afterEach(() => {
  cleanup();
});
