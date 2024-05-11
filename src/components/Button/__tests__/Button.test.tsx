import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "../../../utils/test-utils";
import Button from "../Button";

describe("Button", () => {
  it("should render the button", () => {
    render(<Button>Login</Button>);
    const button = screen.getByRole("button", { name: /login/i });
    expect(button).toBeInTheDocument();
  });

  it("should disable the button", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Button disabled onClick={onClick}>
        Login
      </Button>
    );
    const button = screen.getByRole("button", { name: /login/i });
    expect(button).toHaveAttribute("disabled");

    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it("should click the button", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Login</Button>);
    const button = screen.getByRole("button", { name: /login/i });
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
