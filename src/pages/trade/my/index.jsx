import { useEffect, useState } from "react";
import { BigButton, SmGreenButton } from "../../../components/buttons";
import styles from "./my.module.scss";
import axios from "axios";
import LocalStorage from "../../../services/localStorage";
import DataCreate from "../../../utils/data-create";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MyAccount = () => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const { key, rand_param } = DataCreate();

    axios
      .get("https://cabinet.itcyclonelp.com/api/v_2/trading/GetBalanceInfo", {
        params: {
          key,
          rand_param,
          auth_token: LocalStorage.get("auth_token"),
          user_id: LocalStorage.get("user_id"),
          languages: i18n.language,
        },
      })
      .then((e) => {
        if (e.data.result === "success") {
          setData(Object.values(e.data.values));
        }
      });
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
            {data?.map((item) => (
              <tr key={item.account_id}>
                <td>{item.server_account}</td>
                <td>{`${item.group} (${item.curr})`}</td>
                <td>{item.freeBalance}</td>
                <td>{item.balance}</td>
                <td>{item.margin}</td>
                <td>{item.bonus}</td>
                <td>{item.actives}</td>
                <td>
                  <SmGreenButton className={styles.td_btn}>
                    <Link to={`/trade/open?id=${item.account_id}`}>
                      {t("my_trade.btn")}
                    </Link>
                  </SmGreenButton>
                </td>
              </tr>
            ))}
          </tbody>
          {data.length === 0 && (
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
