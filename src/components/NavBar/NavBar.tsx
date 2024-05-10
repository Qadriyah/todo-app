"use client";
import React from "react";
import Button from "../Button/Button";
import styles from "./NavBar.module.scss";
import { removeItem } from "@/api/localstorage";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  const handleLogout = () => {
    removeItem("user");
    router.push("/");
  };

  return (
    <div className={styles.navbar}>
      <div style={{ paddingInline: 20 }}>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default NavBar;
