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

type IProps = {
  todo: Todo;
  todos: Todo[];
  user: string;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Todo[] | null, Error>>;
};

const TodoItem: React.FC<IProps> = ({ todo, user, todos, refetch }) => {
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
    <div className={styles.wrapper}>
      <p>{todo.name}</p>
      <MdEdit size={20} style={{ cursor: "pointer" }} />
      <FaTrashAlt style={{ cursor: "pointer" }} onClick={handleDelete} />
    </div>
  );
};

export default TodoItem;
