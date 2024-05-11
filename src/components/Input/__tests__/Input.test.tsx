import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "@/utils/test-utils";
import { FaUser } from "react-icons/fa";
import Input from "../Input";

describe("Input", () => {
  it("should render the input element", () => {
    render(<Input placeholder="Email" />);
    const input = screen.getByPlaceholderText(/email/i);
    expect(input).toBeInTheDocument();
  });

  it("should display a label on the input element", () => {
    render(<Input placeholder="Email" label="Email" />);
    const label = screen.getByTestId("Email-label");
    expect(label).toBeInTheDocument();
  });

  it("should display the icon on the input element", () => {
    render(<Input placeholder="Email" icon={<FaUser title="user-icon" />} />);
    const icon = screen.getByTitle("user-icon");
    expect(icon).toBeInTheDocument();
  });

  it("should display error on invalid input", async () => {
    render(<Input placeholder="Email" id="email" error="Invalid email" />);
    const error = screen.getByTestId("email-error");
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent(/Invalid email/i);

    const inputWrapper = screen.getByTestId("email-input");
    expect(inputWrapper).toHaveStyle("border-color: #ff0000;");
  });

  it("should be able to type into the input element", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Email" icon={<FaUser title="user-icon" />} />);
    const input = screen.getByPlaceholderText(/email/i);
    await user.type(input, "baker@gmail.com");
    expect(input).toHaveValue("baker@gmail.com");
  });
});
