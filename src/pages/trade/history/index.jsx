import Selector from "../../../components/selector";
import styles from "./history.module.scss";
import sexData from "../../../utils/sex";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import LocalStorage from "../../../services/localStorage";
import DataCreate from "../../../components/data-create";

const HistoryAccount = () => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const { key, rand_param } = DataCreate();

    axios
      .get(
        "https://cabinet.itcyclonelp.com/api/v_2/trading/GetTradingHistoryByUser",
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
          setData(e.data.values);
        }
      });
  }, []);

  return (
    <>
      <h1>{t("transact.h1")}</h1>
      <div className={styles.history}>
        <fieldset>
          <div className={styles.type}>{t("transact.type")}</div>
          <Selector className={styles.data} data={sexData} />
        </fieldset>

        <table>
          <thead>
            <tr>
              <th>{t("transact.num")}</th>
              <th>{t("transact.symb")}</th>
              <th>{t("transact.type_h")}</th>
              <th>{t("transact.volume")}</th>
              <th>{t("transact.data_o")}</th>
              <th>{t("transact.data_c")}</th>
              <th>{t("transact.price_o")}</th>
              <th>{t("transact.price_c")}</th>
              <th>{t("transact.swal")}</th>
              <th>{t("transact.comm")}</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.SYMBOL}</td>
                <td>{item.POSITION_TYPE}</td>
                <td>{item.VOLUME}</td>
                <td>{new Date(item.OPEN_DATE * 1000).toLocaleDateString()}</td>
                <td>{new Date(item.CLOSE_DATE * 1000).toLocaleDateString()}</td>
                <td>{item.OPEN_PRICE}</td>
                <td>{item.CLOSE_PRICE}</td>
                <td>{item.SWAP}</td>
                <td>{item.SWAP}</td>
              </tr>
            ))}
          </tbody>
          {data.length === 0 && (
            <tfoot>
              <tr>
                <td colSpan={10}>{t("tfoot")}</td>
              </tr>
            </tfoot>
          )}
        </table>

        <div className={styles.money}>
          {t("transact.money")} <span>0.00</span>
        </div>
      </div>
    </>
  );
};

export default HistoryAccount;
