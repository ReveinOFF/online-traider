import { BigButton } from "../../../components/buttons";
import Selector from "../../../components/selector";
import styles from "./open.module.scss";
import sexData from "../../../utils/sex";

const OpenAccount = () => {
  return (
    <>
      <h1>Открыть счет</h1>
      <div className={styles.open}>
        <fieldset>
          <div className={styles.type}>Тип счета</div>
          <Selector className={styles.data} data={sexData} />
        </fieldset>
        <fieldset>
          <div className={styles.type}>Плечо</div>
          <Selector className={styles.data} data={sexData} />
        </fieldset>
        <div className={`justify-center ${styles.btn}`}>
          <BigButton>СОЗДАТЬ СЧЕТ</BigButton>
        </div>
      </div>
    </>
  );
};

export default OpenAccount;
