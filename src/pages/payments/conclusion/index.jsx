import styles from "./conclusion.module.scss";
import { SmGreenButton } from "../../../components/buttons";
import bank from "../../../assets/images/payments/bank.svg";
import webmoney from "../../../assets/images/payments/webmoney.svg";
import card from "../../../assets/images/payments/card.svg";

const Conclusion = () => {
  return (
    <>
      <h1>Ввод средств</h1>
      <div className={`table ${styles.conclusion}`}>
        <table>
          <thead>
            <tr>
              <th>Способ оплаты</th>
              <th></th>
              <th>Валюта</th>
              <th>Комиссия</th>
              <th>Срок перевода</th>
              <th>Пополнение</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="flex-center">
                <img src={bank} alt="bank" width={30} height={30} />
                <div>Bank transfer</div>
              </td>
              <td></td>
              <td>USD/EUR/RUB</td>
              <td>5%</td>
              <td>1-5 work days</td>
              <td>
                <SmGreenButton>ПОПОЛНЕНИЕ</SmGreenButton>
              </td>
            </tr>
            <tr>
              <td className="flex-center">
                <img src={webmoney} alt="bank" width={30} height={30} />
                <div>WebMoney</div>
              </td>
              <td></td>
              <td>USD/EUR/RUB/BTC</td>
              <td>0,5-3%</td>
              <td>Моментально</td>
              <td>
                <SmGreenButton>ПОПОЛНЕНИЕ</SmGreenButton>
              </td>
            </tr>
            <tr>
              <td className="flex-center">
                <img src={card} alt="bank" width={30} height={30} />
                <div>Visa/Mastercard</div>
              </td>
              <td></td>
              <td>USD/EUR/RUB</td>
              <td>3-5%</td>
              <td>Моментально</td>
              <td>
                <SmGreenButton>ПОПОЛНЕНИЕ</SmGreenButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Conclusion;
