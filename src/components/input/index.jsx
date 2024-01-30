import styles from "./input.module.scss";

const CustomInput = ({ type, name, className, placeholder, pattern }) => {
  return (
    <input
      type={type}
      name={name}
      className={`${styles.cstm_input} ${className} roboto`}
      placeholder={placeholder}
      pattern={pattern}
    ></input>
  );
};

export default CustomInput;
