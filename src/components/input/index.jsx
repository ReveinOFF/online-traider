import React from "react";
import styles from "./input.module.scss";

const CustomInput = React.forwardRef(({ error, className, ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={`${styles.cstm_input} ${className} ${
        error ? styles.error_input : ""
      }`}
    ></input>
  );
});

export default CustomInput;
