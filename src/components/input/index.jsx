import styles from "./input.module.scss";

const CustomInput = ({
  type,
  name,
  className,
  required,
  placeholder,
  pattern,
}) => {
  return (
    <input
      type={type}
      name={name}
      className={`${styles.cstm_input} ${className}`}
      placeholder={placeholder}
      pattern={pattern}
      required={required}
    ></input>
  );
};

export default CustomInput;
