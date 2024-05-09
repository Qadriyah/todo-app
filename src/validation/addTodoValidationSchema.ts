import * as Yup from "yup";

export const addTodoValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(25, "Todo should not be more than 25 characters long")
    .required("Todo cannot be empty"),
});
