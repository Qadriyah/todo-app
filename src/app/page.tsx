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
import { useRouter } from "next/navigation";
import { storeItem } from "@/api/localstorage";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/actions/login";

const Login = () => {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: Credentials) => loginUser(data),
  });

  const handleSubmit = async (values: Credentials) => {
    const res = await loginMutation.mutateAsync(values);
    if (!res.user_email) {
      return;
    }
    storeItem("user", res);
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
              loginMutation.isPending
            }
          >
            Login
          </Button>
        </Space>
        {!!loginMutation.error && <p>{loginMutation.error.message}</p>}
      </form>
    </section>
  );
};

export default Login;
