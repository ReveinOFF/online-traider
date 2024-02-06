import styles from "./input.module.scss";

const CustomInput = ({
  type,
  name,
  className,
  required,
  placeholder,
  error,
  pattern,
}) => {
  return (
    <input
      type={type}
      name={name}
      className={`${styles.cstm_input} ${className} ${error ? "error" : ""}`}
      placeholder={placeholder}
      pattern={pattern}
      required={required}
    ></input>
  );
};

export default CustomInput;
