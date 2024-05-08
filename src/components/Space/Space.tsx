import React, { PropsWithChildren } from "react";
import styles from "./Space.module.scss";

type IProps = PropsWithChildren & {
  direction?: "verticle" | "horizontal";
};

const Space: React.FC<IProps> = ({ children, direction = "verticle" }) => {
  return (
    <div
      className={styles.wrapper}
      style={{ flexDirection: direction === "verticle" ? "column" : "row" }}
    >
      {children}
    </div>
  );
};

export default Space;
