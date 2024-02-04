import { SmBlueButton, SmGreenButton } from "../../../../components/buttons";
import CusotmInput from "../../../../components/input";
import styles from "./order.module.scss";

const NewOrders = () => {
  return (
    <>
      <h1 className="h-btn">
        Новые заявки <SmGreenButton>АРХИВ ЗАЯВОК</SmGreenButton>
      </h1>
      <div className={`table ${styles.order}`}>
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
        <table>
          <thead>
            <tr>
              <th>Номер</th>
              <th>Дата создания</th>
              <th>Тип перевода</th>
              <th>ФИО (Логин)</th>
              <th>Тип счета</th>
              <th>Платежная система</th>
              <th>Сумма платежа</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colSpan={8}>Нет результатов</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default NewOrders;
