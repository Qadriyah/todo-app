import React, { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: React.ReactElement;
};

const Input: React.FC<InputProps> = ({ label, error, icon, ...props }) => {
  return (
    <div className={styles.container}>
      {!!label && (
        <label htmlFor={props.id} data-testid={`${label}-label`}>
          {label}
        </label>
      )}
      <div
        className={styles.inputWrapper}
        style={{ borderColor: error ? "#ff0000" : "#000" }}
        data-testid={`${props.id}-input`}
      >
        {icon}
        <input {...props} className={styles.input} />
      </div>
      {!!error && <p data-testid={`${props.id}-error`}>{error}</p>}
    </div>
  );
};

export default Input;
