import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren & {
    loading?: boolean;
    className?: string;
  };

const Button: React.FC<ButtonProps> = ({
  loading,
  className = "btn btn-primary",
  children,
  ...props
}) => {
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

export default Button;
