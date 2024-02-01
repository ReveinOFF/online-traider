import CusotmInput from "../../../components/input";
import { SmBlueButton } from "../../../components/buttons";
import styles from "./my.module.scss";

const MyPayments = () => {
  return (
    <>
      <h1>Мои заявки</h1>
      <div className={styles.my_payments}>
        <div>
          <fieldset className="fs-t">
            <div>Начало</div>
            <CusotmInput type="date" />
          </fieldset>
          <fieldset className="fs-t">
            <div>Конец</div>
            <CusotmInput type="text" />
          </fieldset>
          <fieldset className="fs-t">
            <div>Ключевое слово</div>
            <CusotmInput type="text" placeholder="Введите слово" />
          </fieldset>
          <SmBlueButton className={styles.btn}>ПОИСК</SmBlueButton>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Номер</th>
                <th>Счет</th>
                <th>Тип счета</th>
                <th>Дата создания</th>
                <th>Платежная система</th>
                <th>Тип перевода</th>
                <th>Сумма платежа</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td colSpan={10}>Нет результатов</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyPayments;
