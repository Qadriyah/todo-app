import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./Button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren & {
    loading?: boolean;
  };

const Button: React.FC<ButtonProps> = ({ loading, children, ...props }) => {
  return (
    <button {...props} className={styles.wrapper}>
      {children}
    </button>
  );
};

export default Button;
