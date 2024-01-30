import { useEffect, useState } from "react";
import arrow from "../../assets/images/arrow.svg";
import styles from "./selector.module.scss";

const Selector = ({ data, className, selected, setSelected, disabled }) => {
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
        className={`item-center ${styles.btn_selected} ${
          showSelector ? styles.active : ""
        } ${disabled ? styles.inactive : ""}`}
        onClick={(e) => {
          e.preventDefault();
          setShowSelector(!showSelector);
        }}
      >
        <div>{data[selected] || "Не указан"}</div>
        <img src={arrow} alt="arrow" />
      </button>
      <div className={showSelector ? styles.active : ""}>
        {Object.entries(data).map((item) => (
          <div
            key={item[0]}
            onClick={() => {
              setShowSelector(false);
              setSelected(item[0]);
            }}
          >
            {item[1]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Selector;
