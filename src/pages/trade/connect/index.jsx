import { BigButton } from "../../../components/buttons";
import Selector from "../../../components/selector";
import CustomInput from "../../../components/input";
import styles from "./connect.module.scss";
import sexData from "../../../utils/sex";
import { useState } from "react";

const ConnectAccount = () => {
  const [sexKey, setSexKey] = useState();

  return (
    <>
      <h1>Подключить счет</h1>
      <div className={styles.open}>
        <fieldset>
          <div className={styles.type}>Сервер</div>
          <Selector
            className={styles.data}
            data={sexData}
            selected={sexKey}
            setSelected={setSexKey}
            emptyMsg="Не указан"
          />
        </fieldset>
        <fieldset>
          <div className={styles.type}>Счет</div>
          <CustomInput
            className={styles.data}
            type="text"
            placeholder="Введите номер"
          />
        </fieldset>
        <fieldset>
          <div className={styles.type}>Пароль</div>
          <CustomInput
            className={styles.data}
            type="password"
            placeholder="Введите пароль"
          />
        </fieldset>
        <div className={`justify-center ${styles.btn}`}>
          <BigButton>ПОДКЛЮЧИТЬ</BigButton>
        </div>
      </div>
    </>
  );
};

export default ConnectAccount;
