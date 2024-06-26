import React from "react";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./TodoItem.module.scss";
import { Todo } from "@/types";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { storeItem } from "@/api/localstorage";
import { slugify } from "@/utils";

type IProps = {
  todo: Todo;
  todos: Todo[];
  user: string;
  setSelectedTodo: (item: Todo | null) => void;
  setShowForm: (showForm: boolean) => void;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Todo[] | null, Error>>;
};

const TodoItem: React.FC<IProps> = ({
  todo,
  user,
  todos,
  refetch,
  setSelectedTodo,
  setShowForm,
}) => {
  const deleteTodoMutation = useMutation({
    mutationKey: ["delete-todo"],
    mutationFn: (data: Todo[]) => Promise.resolve(storeItem(user, data)),
  });

  const handleDelete = async () => {
    await deleteTodoMutation.mutateAsync(
      todos.filter((item) => item.id !== todo.id)
    );
    refetch();
  };

  return (
    <div className={styles.wrapper} data-testid="todo-item">
      <p data-testid={slugify(todo.name)}>{todo.name}</p>
      <MdEdit
        size={20}
        style={{ cursor: "pointer" }}
        data-testid={`edit-${slugify(todo.name)}`}
        onClick={() => {
          setSelectedTodo(todo);
          setShowForm(false);
        }}
      />
      <FaTrashAlt
        style={{ cursor: "pointer" }}
        onClick={handleDelete}
        data-testid={`delete-${slugify(todo.name)}`}
      />
    </div>
  );
};

export default TodoItem;
