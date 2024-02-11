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
          setDataFirst(Object.values(e.data.values));
        }
      });

    dataFirst?.forEach(async (item) => {
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
              server_account: item.server_account,
            },
          }
        )
        .then((e) => {
          if (e.data.result === "success") {
            setDataSecond((prev) => [...prev, e.data.values]);
          }
        });
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>{t("my_trade.h1")}</h1>
      <div className="table justify-center">
        <table>
          <thead>
            <tr>
              <th>{t("my_trade.th1")}</th>
              <th>{t("my_trade.th2")}</th>
              <th>{t("my_trade.th3")}</th>
              <th>{t("my_trade.th4")}</th>
              <th>{t("my_trade.th5")}</th>
              <th>{t("my_trade.th6")}</th>
              <th>{t("my_trade.th7")}</th>
              <th>{t("my_trade.th8")}</th>
            </tr>
          </thead>
          <tbody>
            {dataSecond?.map((item) => (
              <tr key={item.id}>
                <td>{item.server_account}</td>
                <td>{item.curr}</td>
                <td>{item.freeBalance}</td>
                <td>{item.balance}</td>
                <td>{item.margin}</td>
                <td>{item.bonus}</td>
                <td>-13.15</td>
                <td>
                  <SmGreenButton className={styles.td_btn}>
                    <Link to="/trade/open">{t("my_trade.btn")}</Link>
                  </SmGreenButton>
                </td>
              </tr>
            ))}
          </tbody>
          {dataSecond.length === 0 && (
            <tfoot>
              <tr>
                <td colSpan={8}>{t("tfoot")}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      <div className={styles.btn}>
        <BigButton className={styles.btn}>
          <Link to="/trade/open">{t("my_trade.btn")}</Link>
        </BigButton>
      </div>
    </>
  );
};

export default MyAccount;
