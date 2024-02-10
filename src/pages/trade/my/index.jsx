import { useEffect, useState } from "react";
import { BigButton, SmGreenButton } from "../../../components/buttons";
import styles from "./my.module.scss";
import axios from "axios";
import LocalStorage from "../../../services/localStorage";
import DataCreate from "../../../components/data-create";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MyAccount = () => {
  const [dataFirst, setDataFirst] = useState([]);
  const [dataSecond, setDataSecond] = useState([]);
  const { t, i18n } = useTranslation();

  const getData = async () => {
    const { key, rand_param } = DataCreate();

    await axios
      .get(
        "https://cabinet.itcyclonelp.com/api/v_2/trading/GetTradeAccountByUser",
        {
          params: {
            key,
            rand_param,
            auth_token: LocalStorage.get("auth_token"),
            user_id: LocalStorage.get("user_id"),
            languages: i18n.language,
          },
        }
      )
      .then((e) => {
        if (e.data.result === "success") {
          setDataFirst(e.data.values);
          console.log(e.data.values);
        }
      });

    await axios
      .get(
        "https://cabinet.itcyclonelp.com/api/v_2/trading/GetTradeAccountInfo",
        {
          params: {
            key,
            rand_param,
            auth_token: LocalStorage.get("auth_token"),
            user_id: LocalStorage.get("user_id"),
            languages: i18n.language,
            server_account: "",
          },
        }
      )
      .then((e) => {
        if (e.data.result === "success") {
          setDataFirst(e.data.values);
          console.log(e.data.values);
        }
      });
  };

  useEffect(() => {
    const { key, rand_param } = DataCreate();

    axios
      .get(
        "https://cabinet.itcyclonelp.com/api/v_2/trading/GetTradeAccountByUser",
        {
          params: {
            key,
            rand_param,
            auth_token: LocalStorage.get("auth_token"),
            user_id: LocalStorage.get("user_id"),
            languages: i18n.language,
            server_account: "10036",
          },
        }
      )
      .then((e) => {
        if (e.data.result === "success") {
          setDataFirst(e.data.values);
          console.log(Object.values(e.data.values));
        }
      });
  }, []);

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
          {/* <tbody>
            {dataFirst?.map((item) => (
              <tr key={item.id}>
                <td>{item.server_account}</td>
                <td>{item.account_currency}</td>
                <td>{item.balance}</td>
                <td>179 642.02</td>
                <td>{item.margin}</td>
                <td>{item.bonus}</td>
                <td>-13.15</td>
                <td>
                  <SmGreenButton className={styles.td_btn}>
                    <Link to="/trade/open">ПОПОЛНИТЬ СЧЕТ</Link>
                  </SmGreenButton>
                </td>
              </tr>
            ))}
          </tbody> */}
          {dataFirst.length === 0 && (
            <tfoot>
              <tr>
                <td colSpan={8}>Нет результатов</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      <div className={styles.btn}>
        <BigButton className={styles.btn}>
          <Link to="/trade/open">ПОПОЛНИТЬ СЧЕТ</Link>
        </BigButton>
      </div>
    </>
  );
};

export default MyAccount;
