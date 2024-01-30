import { useEffect, useState } from "react";
import arrow from "../../assets/images/arrow.svg";
import styles from "./selector.module.scss";

const Selector = ({ data, className, disabled }) => {
  const [showSelector, setShowSelector] = useState(false);

  const changeShowSelector = (e) => {
    if (!e.target.closest(".c_selector")) setShowSelector(false);
  };

  useEffect(() => {
    if (showSelector) {
      document.addEventListener("click", changeShowSelector);
    } else {
      document.removeEventListener("click", changeShowSelector);
    }

    return () => {
      document.removeEventListener("click", changeShowSelector);
    };
  }, [showSelector]);

  return (
    <div className={`${styles.selector} c_selector ${className || ""}`}>
      <button
        className={`flex-center ${styles.btn_selected} ${
          showSelector ? styles.active : ""
        } ${disabled ? styles.inactive : ""}`}
        onClick={() => setShowSelector(!showSelector)}
      >
        <div>Real (USD)</div>
        <img src={arrow} alt="arrow" />
      </button>
      <div className={showSelector ? styles.active : ""}>
        <div
          onClick={() => {
            setShowSelector(false);
          }}
        >
          Real (USD)
        </div>
      </div>
    </div>
  );
};

export default Selector;
