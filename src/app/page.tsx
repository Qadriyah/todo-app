"use client";
import Input from "@/components/Input/Input";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import styles from "./page.module.scss";
import Space from "@/components/Space/Space";
import Button from "@/components/Button/Button";
import { useFormik } from "formik";
import { loginValidationSchema } from "@/validation/loginValidationSchema";
import { Credentials } from "@/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { loginUser } from "@/lib/features/user";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.user);

  const handleSubmit = (values: Credentials) => {
    // dispatch(loginUser(values)).then(() => {});
    router.push("/todo-list");
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validateOnBlur: false,
    validateOnChange: true,
    validateOnMount: false,
    validationSchema: loginValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <section className={styles.container}>
      <form className={styles.loginform} onSubmit={formik.handleSubmit}>
        <h1>Rapptr Labs</h1>
        <Space>
          <Input
            id="email"
            name="email"
            type="email"
            icon={<FaUser />}
            label="Email"
            placeholder="Email address"
            value={formik.values.email}
            error={formik.touched.email ? formik.errors.email : ""}
            onChange={formik.handleChange}
            onBeforeInput={formik.handleBlur}
          />
          <Input
            id="password"
            name="password"
            type="password"
            icon={<FaLock />}
            label="Passeord"
            placeholder="Password"
            value={formik.values.password}
            error={formik.touched.password ? formik.errors.password : ""}
            onChange={formik.handleChange}
            onBeforeInput={formik.handleBlur}
          />
          <Button
            type="submit"
            disabled={
              !formik.values.email ||
              !formik.values.password ||
              !!formik.errors.email ||
              !!formik.errors.password ||
              state.loading === "pending"
            }
          >
            Login
          </Button>
        </Space>
      </form>
    </section>
  );
};

export default Login;
