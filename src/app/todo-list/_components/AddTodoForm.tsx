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

type IProps = {
  todos: Todo[];
  user: string;
  setShowForm: (showForm: boolean) => void;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Todo[] | null, Error>>;
};

const AddTodoForm: React.FC<IProps> = ({
  todos,
  user,
  refetch,
  setShowForm,
}) => {
  const todoMutation = useMutation({
    mutationKey: ["add-todo"],
    mutationFn: (data: Todo[]) => Promise.resolve(storeItem(user, data)),
  });

  const handleSubmit = async (values: { name: string }) => {
    await todoMutation.mutateAsync([
      ...todos,
      { ...values, id: todos.length + 1 },
    ]);
    formik.resetForm();
    setShowForm(false);
    refetch();
  };

  const formik = useFormik({
    initialValues: { name: "" },
    validateOnBlur: false,
    validateOnChange: true,
    validateOnMount: false,
    validationSchema: addTodoValidationSchema,
    onSubmit: handleSubmit,
  });

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
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default AddTodoForm;
