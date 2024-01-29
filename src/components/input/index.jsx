import styles from "./input.module.scss";

const CustomInput = ({ type, name, className, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      className={`${styles.cstm_input} ${className} roboto`}
      placeholder={placeholder}
    ></input>
  );
};

export default CustomInput;
