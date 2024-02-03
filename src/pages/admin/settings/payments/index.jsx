import { SmGreenButton } from "../../../../components/buttons";
import styles from "./payments.module.scss";

const PaymentsAdmin = () => {
  return (
    <>
      <h1>Платежные системы</h1>
      <div className="table">
        <div className="justify-between item-center btn_z-index">
          <h2>Ввод средств</h2>
          <SmGreenButton className={styles.btn}>ДОБАВИТЬ</SmGreenButton>
        </div>
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th></th>
              <th></th>
              <th></th>
              <th className="th-t-left">Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Банковский перевод</td>
              <td></td>
              <td></td>
              <td></td>
              <td className={`td-active ${styles.left}`}>Включена</td>
            </tr>
            <tr>
              <td>Яндекс деньги</td>
              <td></td>
              <td></td>
              <td></td>
              <td className={`td-inactive ${styles.left}`}>Отключено</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={`table ${styles.second_table}`}>
        <h2>Ввод средств</h2>
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th></th>
              <th></th>
              <th></th>
              <th className="th-t-left">Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Банковский перевод</td>
              <td></td>
              <td></td>
              <td></td>
              <td className={`td-active ${styles.left}`}>Включена</td>
            </tr>
            <tr>
              <td>Яндекс деньги</td>
              <td></td>
              <td></td>
              <td></td>
              <td className={`td-inactive ${styles.left}`}>Отключено</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PaymentsAdmin;
