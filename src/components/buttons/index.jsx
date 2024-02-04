import styles from "./buttons.module.scss";

export const BigButton = ({ children, disabled, className }) => {
  return (
    <button
      className={`${styles.big_btn} ${styles.btn} ${className || ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const NmGreenButton = ({ children, disabled, className }) => {
  return (
    <button
      className={`${styles.nmg_btn} ${styles.btn} ${className || ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const SmGreenButton = ({ children, className, disabled }) => {
  return (
    <button
      className={`${styles.smg_btn} ${styles.btn} ${className || ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const SmBlueButton = ({ children, className, disabled, onClick }) => {
  return (
    <button
      className={`${styles.smb_btn} ${styles.btn} ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
