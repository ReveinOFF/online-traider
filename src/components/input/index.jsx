import styles from "./input.module.scss";

const CustomInput = ({
  type,
  name,
  className,
  required,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  pattern,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      className={`${styles.cstm_input} ${className} ${
        error ? styles.error_input : ""
      }`}
      placeholder={placeholder}
      pattern={pattern}
      onChange={onChange}
      onBlur={onBlur}
      required={required}
    ></input>
  );
};

export default CustomInput;
