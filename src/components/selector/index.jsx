import { useEffect, useState } from "react";
import arrow from "../../assets/images/arrow.svg";

const Selector = ({ children, className, selected, disabled }) => {
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
    <div className={`selector ${className || ""}`}>
      <button
        className={`item-center c_selector btn_selected ${
          showSelector ? "active" : ""
        } ${disabled ? "inactive" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          setShowSelector(!showSelector);
        }}
      >
        <div>{selected}</div>
        <img src={arrow} alt="arrow" width={10} height={10} />
      </button>
      <div className={showSelector ? "active" : ""}>{children}</div>
    </div>
  );
};

export default Selector;
