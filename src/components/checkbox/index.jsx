import "./checkbox.style.scss";
import checkedIcon from "../../assets/images/checked.svg";

const Checkbox = ({ checked, setChecked }) => {
  return (
    <div className="checkbox flex-center" onClick={() => setChecked(!checked)}>
      {checked && <img src={checkedIcon} alt="checked" width={11} height={8} />}
    </div>
  );
};

export default Checkbox;
