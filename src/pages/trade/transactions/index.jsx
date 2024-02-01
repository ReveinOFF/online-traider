import Selector from "../../../components/selector";
import styles from "./transactions.module.scss";

const TransactionsAccount = () => {
  const sexData = {
    m: "Мужской",
    f: "Женский",
  };

  return (
    <>
      <h1>Депозитные операции</h1>
      <div className={styles.transactions}>
        <fieldset>
          <div className={styles.type}>Выберите счет</div>
          <Selector className={styles.data} data={sexData} />
        </fieldset>

        <table>
          <thead>
            <tr>
              <th>Дата операции</th>
              <th>Сумма</th>
              <th>Комментарии</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colSpan={3}>Нет результатов</td>
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

export default TransactionsAccount;
