import React, { InputHTMLAttributes } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const SearchBar: React.FC<InputProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <FaSearch />
      <input {...props} className={styles.input} />
    </div>
  );
};

export default SearchBar;
