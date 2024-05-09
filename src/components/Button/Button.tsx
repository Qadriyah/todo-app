import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./Button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren & {
    loading?: boolean;
    color?: "primary" | "secondary";
  };

const btnColors = {
  primary: "#2c75ff",
  secondary: "#000000",
};

const Button: React.FC<ButtonProps> = ({
  loading,
  color = "primary",
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={styles.wrapper}
      style={{ backgroundColor: btnColors[color] }}
    >
      {children}
    </button>
  );
};

export default Button;
