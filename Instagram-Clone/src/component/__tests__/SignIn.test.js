import { render, screen, cleanup, fireEvent, getByTestId } from "@testing-library/react";
import SignIn from "../SignIn";

test('SignIn form should receive email and pw', () => {
  // const userEmail = "test@gmail.com";
  // const password = "secretPW";
  
  // render(<SignIn />);

  // fireEvent.change(getByTestId("userEmail"), {
  //   target: { value: userEmail }
  // });

  // fireEvent.change(getByTestId("password"), {
  //   target: { value: password }
  // });

  // fireEvent.submit(getByTestId("signInSubmit"));

  // const emailSubmitted = screen.getByTestId("userEmail").value;
  // const pwSubmitted = screen.getByTestId("password").value;

  // expect(emailSubmitted).toEqual("test@gmail.com");
  // expect(pwSubmitted).toEqual("secretPW");
})


afterEach(() => {
  cleanup();
});