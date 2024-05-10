"use client";
import React from "react";
import styles from "./TodoList.module.scss";
import SearchBar from "@/components/SearchBar/SearchBar";
import Button from "@/components/Button/Button";
import AddTodoForm from "./_components/AddTodoForm/AddTodoForm";
import { getObectItem } from "@/api/localstorage";
import { Todo, User } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TodoItems from "./_components/TodoItems/TodoItems";
import { useRouter } from "next/navigation";

const TodoList = () => {
  const router = useRouter();
  const user = getObectItem<User>("user");
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = React.useState(false);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);

  const { data, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getObectItem<Todo[]>(user?.user_username!),
    enabled: !!user?.user_username,
  });

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!value) {
      return refetch();
    }
    const filteredTodos = data?.filter((todo) =>
      todo.name.toLowerCase().includes(value.toLowerCase())
    );
    queryClient.setQueryData(["todos"], filteredTodos);
  };

  React.useEffect(() => {
    const user = getObectItem("user");
    if (!user) {
      router.push("/");
    }
  }, [router]);

  return (
    <section className={styles.container}>
      <h1>My To-Do List</h1>
      <div className={styles.todoList}>
        <div className={styles.header}>
          <SearchBar placeholder="Search" onChange={onSearch} />
          <Button
            onClick={() => {
              setSelectedTodo(null);
              setShowForm(true);
            }}
          >
            New
          </Button>
        </div>
        {showForm && (
          <AddTodoForm
            todo={selectedTodo}
            todos={data || []}
            user={user?.user_username!}
            refetch={refetch}
            setShowForm={setShowForm}
            setSelectedTodo={setSelectedTodo}
          />
        )}
        <TodoItems
          todos={data || []}
          todo={selectedTodo}
          user={user?.user_username!}
          refetch={refetch}
          setSelectedTodo={setSelectedTodo}
          setShowForm={setShowForm}
        />
      </div>
    </section>
  );
};

export default TodoList;
