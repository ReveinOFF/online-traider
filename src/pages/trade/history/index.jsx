import Selector from "../../../components/selector";
import styles from "./history.module.scss";

const HistoryAccount = () => {
  const sexData = {
    m: "Мужской",
    f: "Женский",
  };

  return (
    <>
      <h1>Торговая история</h1>
      <div className={styles.history}>
        <fieldset>
          <div className={styles.type}>Тип счета</div>
          <Selector className={styles.data} data={sexData} />
        </fieldset>

        <table>
          <thead>
            <tr>
              <th>Номер</th>
              <th>Символ</th>
              <th>Тип</th>
              <th>Объем</th>
              <th>Дата открытия</th>
              <th>Дата закрытия</th>
              <th>Цена открытия</th>
              <th>Цена закрытия</th>
              <th>Своп</th>
              <th>Комментарии</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colSpan={10}>Нет результатов</td>
            </tr>
          </tfoot>
        </table>

        <div className={styles.money}>
          Прибыль: <span>0.00</span>
        </div>
      </div>
    </>
  );
};

export default HistoryAccount;
