import styles from "./report.module.scss";
import CusotmInput from "../../../../components/input";
import { SmBlueButton } from "../../../../components/buttons";
import arrowIcon from "../../../../assets/images/arrow.svg";

const ReportSystem = () => {
  return (
    <>
      <h1>Отчет по платежным системам</h1>
      <div className={`table ${styles.report}`}>
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
          <SmBlueButton className={styles.btn}>ПОКАЗАТЬ</SmBlueButton>
        </div>
        <div className={styles.block_select}>
          <div>Тип заявки:</div>
          <div>
            Все <img src={arrowIcon} alt="arrow" width={10} height={7} />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Номер</th>
              <th>Дата перевода</th>
              <th>Тип перевода</th>
              <th>ФИО (Логин)</th>
              <th>Счет</th>
              <th>Платежная система</th>
              <th>Сумма платежа</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colSpan={7}>Нет результатов</td>
            </tr>
          </tfoot>
        </table>
        <div className={styles.block_info}>
          <div>
            <div>Заявки:</div>
            <div>0</div>
          </div>
          <div>
            <div>Вводы:</div>
            <div>0.00 USD</div>
          </div>
          <div>
            <div>Выводы:</div>
            <div>0.00 USD</div>
          </div>
          <div>
            <div>Сумма:</div>
            <div>0.00 USD</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportSystem;
