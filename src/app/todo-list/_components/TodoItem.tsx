import React from "react";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./TodoItem.module.scss";
import { Todo } from "@/types";

type IProps = {
  todo: Todo;
};

const TodoItem: React.FC<IProps> = ({ todo }) => {
  return (
    <div className={styles.wrapper}>
      <p>{todo.name}</p>
      <MdEdit size={20} style={{ cursor: "pointer" }} />
      <FaTrashAlt style={{ cursor: "pointer" }} />
    </div>
  );
};

export default TodoItem;
