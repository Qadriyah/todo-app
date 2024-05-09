"use client";
import React from "react";
import styles from "./TodoList.module.scss";
import SearchBar from "@/components/SearchBar/SearchBar";
import Button from "@/components/Button/Button";
import TodoItem from "./_components/TodoItem";
import AddTodoForm from "./_components/AddTodoForm";
import { getObectItem } from "@/api/localstorage";
import { Todo, User } from "@/types";
import { useQuery } from "@tanstack/react-query";

const TodoList = () => {
  const [showForm, setShowForm] = React.useState(false);
  const user = getObectItem<User>("user");

  const { data, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getObectItem<Todo[]>(user?.user_username!),
    enabled: !!user?.user_username,
  });

  return (
    <section className={styles.container}>
      <h1>My To-Do List</h1>
      <div className={styles.todoList}>
        <div className={styles.header}>
          <SearchBar placeholder="Search" />
          <Button onClick={() => setShowForm(true)}>New</Button>
        </div>
        {showForm && (
          <AddTodoForm
            todos={data || []}
            user={user?.user_username!}
            refetch={refetch}
            setShowForm={setShowForm}
          />
        )}
        <div className={styles.todoItems}>
          {data?.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              todos={data || []}
              user={user?.user_username!}
              refetch={refetch}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TodoList;
