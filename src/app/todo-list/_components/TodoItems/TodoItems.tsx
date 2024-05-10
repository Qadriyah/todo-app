import React from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Todo } from "@/types";
import TodoItem from "../TodoItem/TodoItem";
import styles from "../../TodoList.module.scss";
import AddTodoForm from "../AddTodoForm/AddTodoForm";

type IProps = {
  todo: Todo | null;
  todos: Todo[];
  user: string;
  setSelectedTodo: (item: Todo | null) => void;
  setShowForm: (showForm: boolean) => void;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Todo[] | null, Error>>;
};

const TodoItems: React.FC<IProps> = ({
  todo,
  todos,
  user,
  refetch,
  setSelectedTodo,
  setShowForm,
}) => {
  return (
    <div className={styles.todoItems}>
      {todos?.length! > 0 ? (
        todos
          ?.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((item) => {
            if (todo?.id === item.id) {
              return (
                <AddTodoForm
                  key={item.id}
                  todo={todo}
                  todos={todos}
                  user={user}
                  refetch={refetch}
                  setShowForm={setShowForm}
                  setSelectedTodo={setSelectedTodo}
                />
              );
            }
            return (
              <TodoItem
                key={item.id}
                todo={item}
                todos={todos}
                user={user}
                refetch={refetch}
                setSelectedTodo={setSelectedTodo}
                setShowForm={setShowForm}
              />
            );
          })
      ) : (
        <p>You do not have any todos</p>
      )}
    </div>
  );
};

export default TodoItems;
