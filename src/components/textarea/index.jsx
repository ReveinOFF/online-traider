import styles from "./textarea.module.scss";

const CustomTextArea = ({ className, ...otherProps }) => {
  return (
    <textarea
      className={`${styles.cstm_textarea} ${className}`}
      {...otherProps}
    ></textarea>
  );
};

export default CustomTextArea;
