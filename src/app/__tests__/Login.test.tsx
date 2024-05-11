import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { act, render, screen, waitFor } from "@/utils/test-utils";
import Login from "../page";

describe("Login", () => {
  beforeEach(() => {
    render(<Login />);
  });

  it("should render the Login page", () => {
    const title = screen.getByRole("heading", { name: "Rapptr Labs" });
    expect(title).toBeInTheDocument();
  });

  it("should type into the login form", async () => {
    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText(/email address/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    await user.type(emailInput, "baker@gmail.com");
    await user.type(passwordInput, "Test123");
    expect(emailInput).toHaveValue("baker@gmail.com");
    expect(passwordInput).toHaveValue("Test123");
  });
});
