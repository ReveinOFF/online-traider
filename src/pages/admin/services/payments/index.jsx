import {
  SmBlueButton,
  SmGreenButton,
  BigButton,
} from "../../../../components/buttons";
import styles from "./payment.module.scss";
import CustomInput from "../../../../components/input";
import Checkbox from "../../../../components/checkbox";

const PaymentService = () => {
  return (
    <>
      <h1>Ввод средств</h1>
      <div className={styles.top_btn}>
        <SmGreenButton>ВВОД</SmGreenButton>
        <SmBlueButton>ВЫВОД</SmBlueButton>
      </div>
      <h2>Ввод средств</h2>
      <div className={styles.block_data}>
        <fieldset className={`${styles.fs}`}>
          <div>Номер торгового счета</div>
          <CustomInput type="text" placeholder="Введите номер" />
        </fieldset>
        <fieldset className={`${styles.fs}`}>
          <div>Сумма платежа</div>
          <CustomInput type="text" placeholder="Введите сумму" />
        </fieldset>
        <fieldset className={`${styles.fs}`}>
          <div>Комментарий</div>
          <CustomInput type="text" placeholder="Введите комментарий" />
        </fieldset>
        <fieldset className={`${styles.fs}`}>
          <div>Создать заявку</div>
          <Checkbox />
        </fieldset>
        <div className={styles.btn}>
          <BigButton>ВВОД</BigButton>
        </div>
      </div>
    </>
  );
};

export default PaymentService;
