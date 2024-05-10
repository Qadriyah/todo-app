import React, { PropsWithChildren } from "react";
import styles from "./Space.module.scss";

type IProps = PropsWithChildren & {
  direction?: "verticle" | "horizontal";
  size?: number;
};

const Space: React.FC<IProps> = ({
  children,
  direction = "verticle",
  size = 20,
}) => {
  return (
    <div
      className={styles.wrapper}
      style={{
        flexDirection: direction === "verticle" ? "column" : "row",
        gap: `${size}px`,
      }}
    >
      {children}
    </div>
  );
};

export default Space;
