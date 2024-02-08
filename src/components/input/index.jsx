import styles from "./input.module.scss";

const CustomInput = ({ error, className, ...otherProps }) => {
  return (
    <input
      {...otherProps}
      className={`${styles.cstm_input} ${className} ${
        error ? styles.error_input : ""
      }`}
    ></input>
  );
};

export default CustomInput;
