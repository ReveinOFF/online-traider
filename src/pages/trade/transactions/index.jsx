import Selector from "../../../components/selector";
import styles from "./transactions.module.scss";
import { useEffect, useState } from "react";
import LocalStorage from "../../../services/localStorage";
import DataCreate from "../../../utils/data-create";
import axios from "axios";
import { useTranslation } from "react-i18next";

const TransactionsAccount = () => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const { key, rand_param } = DataCreate();

    axios
      .get(
        "https://cabinet.itcyclonelp.com/api/v_2/trading/GetDepositsByUser",
        {
          params: {
            key,
            rand_param,
            auth_token: LocalStorage.get("auth_token"),
            user_id: LocalStorage.get("user_id"),
          },
        }
      )
      .then((e) => {
        if (e.data.result === "success") {
          setData(Object.values(e.data.values));
        }
      });
  }, []);

  return (
    <>
      <h1>{t("deposit.h1")}</h1>
      <div className={styles.transactions}>
        <fieldset>
          <div className={styles.type}>{t("deposit.select")}</div>
          <Selector className={styles.data}></Selector>
        </fieldset>

        <table>
          <thead>
            <tr>
              <th>{t("deposit.th1")}</th>
              <th>{t("deposit.th2")}</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>{t("deposit.th3")}</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.ID}>
                <td>
                  {new Date(item.OPERATION_DATE * 1000).toLocaleDateString()}
                </td>
                <td>{item.EQUITY}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{item.COMMENT}</td>
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

        <div className={styles.money}>
          {t("deposit.money")} <span>0.00</span>
        </div>
      </div>
    </>
  );
};

export default TransactionsAccount;
