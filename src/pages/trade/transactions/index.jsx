import Selector from "../../../components/selector";
import styles from "./transactions.module.scss";
import sexData from "../../../utils/sex";
import { useState } from "react";

const TransactionsAccount = () => {
  const [sexKey, setSexKey] = useState();

  return (
    <>
      <h1>Депозитные операции</h1>
      <div className={styles.transactions}>
        <fieldset>
          <div className={styles.type}>Выберите счет</div>
          <Selector
            className={styles.data}
            data={sexData}
            selected={sexKey}
            setSelected={setSexKey}
            emptyMsg="Не указан"
          />
        </fieldset>

        <table>
          <thead>
            <tr>
              <th>Дата операции</th>
              <th>Сумма</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>Комментарии</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colSpan={8}>Нет результатов</td>
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
