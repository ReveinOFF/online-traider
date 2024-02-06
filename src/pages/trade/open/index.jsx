import { BigButton } from "../../../components/buttons";
import Selector from "../../../components/selector";
import styles from "./open.module.scss";
import sexData from "../../../utils/sex";
import { useState } from "react";

const OpenAccount = () => {
  const [sexKey, setSexKey] = useState();

  return (
    <>
      <h1>Открыть счет</h1>
      <div className={styles.open}>
        <fieldset>
          <div className={styles.type}>Тип счета</div>
          <Selector
            className={styles.data}
            data={sexData}
            selected={sexKey}
            setSelected={setSexKey}
            emptyMsg="Не указан"
          />
        </fieldset>
        <fieldset>
          <div className={styles.type}>Плечо</div>
          <Selector
            className={styles.data}
            data={sexData}
            selected={sexKey}
            setSelected={setSexKey}
            emptyMsg="Не указан"
          />
        </fieldset>
        <div className={`justify-center ${styles.btn}`}>
          <BigButton>СОЗДАТЬ СЧЕТ</BigButton>
        </div>
      </div>
    </>
  );
};

export default OpenAccount;
