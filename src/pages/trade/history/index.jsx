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
  const [dataAcc, setDataAcc] = useState([]);
  const [selectAcc, setSelectAcc] = useState();
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
          setDataAcc(e.data.values);
          setSelectAcc(e.data.values[0]?.server_account);
        }
      });

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
      <div className={`${styles.history} ${styles.adaptive}`}>
        <fieldset>
          <div className={styles.type}>{t("transact.type")}</div>
          <Selector
            selected={selectAcc}
            className={styles.data}
            disabled={data.length === 0}
          >
            {dataAcc?.map((item) => (
              <div
                key={item.server_account}
                onClick={() => setSelectAcc(item.server_account)}
              >
                {item.server_account}
              </div>
            ))}
          </Selector>
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
            {data
              ?.find((item) =>
                item.positions?.some((el) => el.ACCOUNT_ID === selectAcc)
              )
              ?.positions.map((el) => (
                <tr key={el.ID}>
                  <td data-label={t("transact.num")}>{el.ID}</td>
                  <td data-label={t("transact.symb")}>{el.SYMBOL}</td>
                  <td data-label={t("transact.type_h")}>{el.POSITION_TYPE}</td>
                  <td data-label={t("transact.volume")}>{el.VOLUME}</td>
                  <td data-label={t("transact.data_o")}>
                    {new Date(el.OPEN_DATE * 1000).toLocaleDateString()}
                  </td>
                  <td data-label={t("transact.data_c")}>
                    {new Date(el.CLOSE_DATE * 1000).toLocaleDateString()}
                  </td>
                  <td data-label={t("transact.price_o")}>
                    {convertMoney(el.OPEN_PRICE)}
                  </td>
                  <td data-label={t("transact.price_c")}>
                    {convertMoney(el.CLOSE_PRICE)}
                  </td>
                  <td data-label={t("transact.swal")}>{el.SWAP}</td>
                  <td data-label={t("transact.comm")}>{el.SWAP}</td>
                </tr>
              ))}
          </tbody>
          {(data.length === 0 ||
            data.every(
              (item) =>
                !item.positions?.some((el) => el.ACCOUNT_ID === selectAcc)
            )) && (
            <tfoot>
              <tr>
                <td colSpan={10}>{t("tfoot")}</td>
              </tr>
            </tfoot>
          )}
        </table>

        <div className={styles.money}>
          {t("transact.money")}{" "}
          <span>
            {convertMoney(
              data?.find((item) =>
                item.positions?.some((el) => el.ACCOUNT_ID === selectAcc)
              )?.total.sum_profit_all
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default HistoryAccount;
