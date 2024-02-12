import Selector from "../../../components/selector";
import styles from "./history.module.scss";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import LocalStorage from "../../../services/localStorage";
import DataCreate from "../../../utils/data-create";
import convertMoney from "../../../utils/convertMoney";

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
          setData(Object.values(e.data.values));
        }
      });
  }, []);

  return (
    <>
      <h1>{t("transact.h1")}</h1>
      <div className={styles.history}>
        <fieldset>
          <div className={styles.type}>{t("transact.type")}</div>
          <Selector className={styles.data}></Selector>
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
            {data?.map((item) =>
              item.positions?.map((el) => (
                <tr key={el.ID}>
                  {console.log(el)}
                  <td>{el.ID}</td>
                  <td>{el.SYMBOL}</td>
                  <td>{el.POSITION_TYPE}</td>
                  <td>{el.VOLUME}</td>
                  <td>{new Date(el.OPEN_DATE * 1000).toLocaleDateString()}</td>
                  <td>{new Date(el.CLOSE_DATE * 1000).toLocaleDateString()}</td>
                  <td>{convertMoney(el.OPEN_PRICE)}</td>
                  <td>{convertMoney(el.CLOSE_PRICE)}</td>
                  <td>{el.SWAP}</td>
                  <td>{el.SWAP}</td>
                </tr>
              ))
            )}
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
