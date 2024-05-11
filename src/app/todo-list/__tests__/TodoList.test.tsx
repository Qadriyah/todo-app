import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "@/utils/test-utils";
import TodoList from "../page";

const todos = ["Workout", "Pay bills", "Get lunch", "Take kids to school"];

describe("TodoList", () => {
  beforeEach(() => {
    render(<TodoList />);
  });
  it("should render the todo list page", () => {
    const title = screen.getByRole("heading", { name: /My To-Do List/i });
    expect(title).toBeInTheDocument();
  });

  it("should show the new todo form", async () => {
    const user = userEvent.setup();
    const newButton = screen.getByRole("button", { name: /new/i });
    await user.click(newButton);

    const inputField = screen.getByPlaceholderText(/Enter your todo/i);
    expect(inputField).toBeInTheDocument();
  });

  it("should type in the new todo input field", async () => {
    const user = userEvent.setup();
    const newButton = screen.getByRole("button", { name: /new/i });
    await user.click(newButton);

    const inputField = screen.getByPlaceholderText(/Enter your todo/i);
    await user.type(inputField, "Go to gym");

    expect(inputField).toHaveValue("Go to gym");
  });

  it("should add a new todo item on the list", async () => {
    const user = userEvent.setup();
    const newButton = screen.getByRole("button", { name: /new/i });
    await user.click(newButton);

    const inputField = screen.getByPlaceholderText(/Enter your todo/i);
    const saveButton = screen.getByRole("button", { name: /save/i });
    await user.type(inputField, "Go to gym");
    await user.click(saveButton);

    const item = screen.getByTestId("go-to-gym");
    expect(item).toBeInTheDocument();
  });

  it("should add multiple todo item on the list", async () => {
    const user = userEvent.setup();
    for (const todo of todos) {
      const newButton = screen.getByRole("button", { name: /new/i });
      await user.click(newButton);

      const saveButton = screen.getByRole("button", { name: /save/i });
      const inputField = screen.getByPlaceholderText(/Enter your todo/i);
      await user.type(inputField, todo);
      await user.click(saveButton);
    }

    const items = screen.getAllByTestId("todo-item");
    expect(items).toHaveLength(4);
  });

  it("should display the curent todo item", async () => {
    const user = userEvent.setup();
    for (const todo of todos) {
      const newButton = screen.getByRole("button", { name: /new/i });
      await user.click(newButton);

      const saveButton = screen.getByRole("button", { name: /save/i });
      const inputField = screen.getByPlaceholderText(/Enter your todo/i);
      await user.type(inputField, todo);
      await user.click(saveButton);
    }

    const items = screen.getAllByTestId("todo-item");
    expect(items[0]).toHaveTextContent("Take kids to school");
  });

  it("should open the todo item in edit mode", async () => {
    const user = userEvent.setup();
    for (const todo of todos) {
      const newButton = screen.getByRole("button", { name: /new/i });
      await user.click(newButton);

      const saveButton = screen.getByRole("button", { name: /save/i });
      const inputField = screen.getByPlaceholderText(/Enter your todo/i);
      await user.type(inputField, todo);
      await user.click(saveButton);
    }

    const editButton = screen.getByTestId("edit-get-lunch");
    await user.click(editButton);

    const inputField = screen.getByPlaceholderText(/Enter your todo/i);
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue("Get lunch");
  });

  it("should edit the todo item", async () => {
    const user = userEvent.setup();
    for (const todo of todos) {
      const newButton = screen.getByRole("button", { name: /new/i });
      await user.click(newButton);

      const saveButton = screen.getByRole("button", { name: /save/i });
      const inputField = screen.getByPlaceholderText(/Enter your todo/i);
      await user.type(inputField, todo);
      await user.click(saveButton);
    }

    const editButton = screen.getByTestId("edit-get-lunch");
    await user.click(editButton);

    const inputField = screen.getByPlaceholderText(/Enter your todo/i);
    const saveButton = screen.getByRole("button", { name: /save/i });
    await user.type(inputField, " with him");
    await user.click(saveButton);

    const items = screen.getAllByTestId("todo-item");
    expect(items[1]).toHaveTextContent("Get lunch with him");
  });

  it("should delete the todo item", async () => {
    const user = userEvent.setup();
    for (const todo of todos) {
      const newButton = screen.getByRole("button", { name: /new/i });
      await user.click(newButton);

      const saveButton = screen.getByRole("button", { name: /save/i });
      const inputField = screen.getByPlaceholderText(/Enter your todo/i);
      await user.type(inputField, todo);
      await user.click(saveButton);
    }

    const deleteButton = screen.getByTestId("delete-get-lunch");
    await user.click(deleteButton);

    const items = screen.getAllByTestId("todo-item");
    expect(items).toHaveLength(3);

    const item = screen.queryByTestId("get-lunch");
    expect(item).not.toBeInTheDocument();
  });
});
