import { SmBlueButton, SmGreenButton } from "../../../../components/buttons";
import CusotmInput from "../../../../components/input";
import styles from "./management.module.scss";

const Management = () => {
  return (
    <>
      <h1 className="h-btn">
        Управление счетами <SmGreenButton>ПОДКЛЮЧИТЬ СЧЕТ</SmGreenButton>
      </h1>
      <div className={`table ${styles.management}`}>
        <div>
          <fieldset className="fs-t">
            <div>Ключевое слово</div>
            <CusotmInput type="text" placeholder="Введите слово" />
          </fieldset>
          <SmBlueButton className={styles.btn}>ПОИСК</SmBlueButton>
        </div>
        <table>
          <thead>
            <tr>
              <th>Счет</th>
              <th>Логин</th>
              <th>ФИО</th>
              <th>E-Mail</th>
              <th>Тип счета</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colSpan={5}>Нет результатов</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Management;
