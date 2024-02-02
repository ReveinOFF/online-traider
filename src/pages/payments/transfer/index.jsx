import { useState } from "react";
import Selector from "../../../components/selector";
import CustomInput from "../../../components/input";
import { SmGreenButton } from "../../../components/buttons";
import styles from "./transfer.module.scss";
import sexData from "../../../utils/sex";

const Transfer = () => {
  const [sexKey, setSexKey] = useState();

  return (
    <>
      <h1>Bank transfer</h1>
      <div className={`item-center ${styles.block_transfer}`}>
        <div className={styles.info}>
          <div>Валюта: USD/EUR/RUB</div>
          <div>Комиссия: 5%</div>
          <div>Срок перевода: 1-5 work days</div>
        </div>
        <div className={styles.s_transfer}>
          <fieldset className="fs-t">
            <div>Счет</div>
            <Selector
              data={sexData}
              selected={sexKey}
              setSelected={setSexKey}
            />
          </fieldset>
          <fieldset className="fs-t">
            <div>Валюта платежа</div>
            <Selector
              data={sexData}
              selected={sexKey}
              setSelected={setSexKey}
            />
          </fieldset>
          <fieldset className={`flex-center ${styles.fs_lr}`}>
            <div>Сумма платежа</div>
            <CustomInput type="number" />
            <div>USD</div>
          </fieldset>
        </div>
        <SmGreenButton>ДАЛЕЕ</SmGreenButton>
      </div>
    </>
  );
};

export default Transfer;
