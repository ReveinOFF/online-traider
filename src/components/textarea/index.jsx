import styles from "./textarea.module.scss";

const CustomTextArea = ({ name, className, placeholder }) => {
  return (
    <textarea
      name={name}
      className={`${styles.cstm_textarea} ${className}`}
      placeholder={placeholder}
    ></textarea>
  );
};

export default CustomTextArea;
