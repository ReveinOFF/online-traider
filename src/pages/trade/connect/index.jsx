import { BigButton } from "../../../components/buttons";
import Selector from "../../../components/selector";
import CustomInput from "../../../components/input";
import styles from "./connect.module.scss";
import sexData from "../../../utils/sex";

const ConnectAccount = () => {
  return (
    <>
      <h1>Подключить счет</h1>
      <div className={styles.open}>
        <fieldset>
          <div className={styles.type}>Сервер</div>
          <Selector className={styles.data} data={sexData} />
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
