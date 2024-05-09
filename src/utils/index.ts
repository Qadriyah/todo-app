import { Todo } from "@/types";

export const generateId = (todos: Todo[]): number => {
  let id: number = Math.ceil(Math.random() * (1000 - 1) + 1);
  const found = todos?.find((item) => item.id === id);
  if (found) {
    return generateId(todos);
  }
  return id;
};
