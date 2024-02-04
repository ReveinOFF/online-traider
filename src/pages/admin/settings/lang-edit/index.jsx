import CustomInput from "../../../../components/input";
import styles from "./lang.module.scss";
import Checkbox from "../../../../components/checkbox";
import { BigButton } from "../../../../components/buttons";

const LangEdit = () => {
  return (
    <>
      <h1>Редактировать язык</h1>
      <h2>Настройки</h2>
      <form className={styles.block_data}>
        <fieldset>
          <div>Язык</div>
          <CustomInput type="text" />
        </fieldset>
        <fieldset>
          <div>Идентификатор языка</div>
          <div>en</div>
        </fieldset>
        <fieldset>
          <div>Активность</div>
          <Checkbox />
        </fieldset>
        <div className={`justify-center`}>
          <BigButton className={styles.btn}>СОХРАНИТЬ</BigButton>
        </div>
      </form>
    </>
  );
};

export default LangEdit;
