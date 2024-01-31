import { useState } from "react";
import "./checkbox.style.scss";
import checkedIcon from "../../assets/images/checked.svg";

const Checkbox = () => {
  const [checked, setSecked] = useState();

  return (
    <div className="checkbox flex-center" onClick={() => setSecked(!checked)}>
      {checked && <img src={checkedIcon} alt="checked" width={11} height={8} />}
    </div>
  );
};

export default Checkbox;
