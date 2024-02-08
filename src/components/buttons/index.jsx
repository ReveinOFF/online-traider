import styles from "./buttons.module.scss";

export const BigButton = ({ children, className, ...otherProps }) => {
  return (
    <button
      className={`${styles.big_btn} ${styles.btn} ${className || ""}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export const NmGreenButton = ({ children, className, ...otherProps }) => {
  return (
    <button
      className={`${styles.nmg_btn} ${styles.btn} ${className || ""}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export const SmGreenButton = ({ children, className, ...otherProps }) => {
  return (
    <button
      className={`${styles.smg_btn} ${styles.btn} ${className || ""}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export const SmBlueButton = ({ children, className, ...otherProps }) => {
  return (
    <button
      className={`${styles.smb_btn} ${styles.btn} ${className || ""}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};
