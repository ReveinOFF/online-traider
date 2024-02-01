import { BigButton, SmGreenButton } from "../../../components/buttons";
import styles from "./my.module.scss";

const MyAccount = () => {
  return (
    <>
      <h1>Мои счета</h1>
      <div className="table justify-center">
        <table>
          <thead>
            <tr>
              <th>Счет</th>
              <th>Тип счета</th>
              <th>Можно вывести</th>
              <th>Средства</th>
              <th>Залог</th>
              <th>Бонусный баланс</th>
              <th>Прибыль</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>800004</td>
              <td>Real (USD)</td>
              <td>179 387.23</td>
              <td>179 642.02</td>
              <td>254.79</td>
              <td>254.79</td>
              <td>-13.15</td>
              <td>
                <SmGreenButton className={styles.td_btn}>
                  ПОПОЛНИТЬ СЧЕТ
                </SmGreenButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.btn}>
        <BigButton className={styles.btn}>ПОПОЛНИТЬ СЧЕТ</BigButton>
      </div>
    </>
  );
};

export default MyAccount;
