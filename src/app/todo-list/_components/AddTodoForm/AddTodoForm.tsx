import React from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import styles from "./AddTodoForm.module.scss";
import { useFormik } from "formik";
import { addTodoValidationSchema } from "@/validation/addTodoValidationSchema";
import { Todo } from "@/types";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { storeItem } from "@/api/localstorage";
import { generateId } from "@/utils";

type IProps = {
  todo?: Todo | null;
  todos: Todo[];
  user: string;
  setShowForm: (showForm: boolean) => void;
  setSelectedTodo: (item: Todo | null) => void;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Todo[] | null, Error>>;
};

const AddTodoForm: React.FC<IProps> = ({
  todo,
  todos,
  user,
  refetch,
  setShowForm,
  setSelectedTodo,
}) => {
  const createTodoMutation = useMutation({
    mutationKey: ["add-todo"],
    mutationFn: (data: Todo[]) => Promise.resolve(storeItem(user, data)),
  });

  const updateTodoMutation = useMutation({
    mutationKey: ["update-todo"],
    mutationFn: (data: Todo[]) => Promise.resolve(storeItem(user, data)),
  });

  const handleSubmit = async (values: { name: string }) => {
    await createTodoMutation.mutateAsync([
      ...todos,
      {
        ...values,
        id: generateId(todos),
        createdAt: new Date().toISOString(),
      },
    ]);
    formik.resetForm();
    setSelectedTodo(null);
    setShowForm(false);
    refetch();
  };

  const onUpdateTodo = async (values: { name: string }) => {
    const updatedTodos = todos.map((item) => {
      if (item.id === todo?.id) {
        return {
          ...item,
          name: values.name,
        };
      }
      return item;
    });
    await updateTodoMutation.mutateAsync(updatedTodos);
    formik.resetForm();
    setSelectedTodo(null);
    setShowForm(false);
    refetch();
  };

  const formik = useFormik({
    initialValues: { name: todo?.name || "" },
    validateOnBlur: false,
    validateOnChange: true,
    validateOnMount: false,
    validationSchema: addTodoValidationSchema,
    onSubmit: todo ? onUpdateTodo : handleSubmit,
  });

  React.useEffect(() => {
    if (todo) {
      formik.setValues({ name: todo.name });
    }
  }, [todo]);

  return (
    <form className={styles.wrapper} onSubmit={formik.handleSubmit}>
      <Input
        placeholder="Enter your todo"
        id="name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBeforeInput={formik.handleBlur}
        error={formik.touched.name ? formik.errors.name : ""}
      />
      <div>
        <Button
          color="secondary"
          type="submit"
          disabled={!formik.values.name || !!formik.errors.name}
          className="btn btn-secondary"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default AddTodoForm;
