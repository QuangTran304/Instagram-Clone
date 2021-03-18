import { render, screen } from "@testing-library/react";
import App from "./App";
import CreatePost from "./component/CreatePost";
import Post from "./component/Post";

test("renders learn react link", () => {
  render(<Post />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
