import type { Metadata } from "next";
import NavBar from "@/components/NavBar/NavBar";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Todo List",
  description: "",
};

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
    </div>
  );
};

export default RootLayout;
