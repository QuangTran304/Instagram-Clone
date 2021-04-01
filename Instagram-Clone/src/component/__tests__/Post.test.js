// import { render, screen } from "@testing-library/react";
// import App from "./App";
// import Post from "./component/Post";

// test("renders learn react link", () => {
//   render(<Post />);
//   // const linkElement = screen.getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();
// });



import { render, cleanup } from "@testing-library/react";
import Post from '../Post';

test('Post should render', () => {
  const { container } = render(<Post />);
  expect(container.querySelector('.post-username')).toBeNull();
  expect(container.querySelector('.post-image')).toBeNull();
})

afterEach(() => {
  cleanup();
});
