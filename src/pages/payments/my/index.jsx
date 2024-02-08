import CusotmInput from "../../../components/input";
import { SmBlueButton } from "../../../components/buttons";
import styles from "./my.module.scss";
import axios from "axios";
import DataCreate from "../../../components/data-create";
import LocalStorage from "../../../services/localStorage";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const MyPayments = () => {
  const [payment, setPayment] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const { key, rand_param } = DataCreate();

    axios
      .get("https://cabinet.itcyclonelp.com/api/v_2/Payments/GetUsersClaims", {
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
          setPayment(e.data.values);
          setFilteredData(e.data.values);
        }
      });
  }, []);

  const handleClick = () => {
    const filtered = Object.entries(payment).filter(([key, item]) => {
      const startDateMatch = startDate
        ? new Date(item.creation_date * 1000) >= new Date(startDate)
        : true;
      const endDateMatch = endDate
        ? new Date(item.creation_date * 1000) <= new Date(endDate)
        : true;
      const keywordMatch = keyword
        ? item.payment_type.toLowerCase().includes(keyword.toLowerCase())
        : true;

      return startDateMatch && endDateMatch && keywordMatch;
    });

    setFilteredData(filtered);
  };

  return (
    <>
      <h1>{t("my_payment.h1")}</h1>
      <div className={styles.my_payments}>
        <div>
          <fieldset className="fs-t">
            <div>{t("my_payment.start")}</div>
            <CusotmInput
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </fieldset>
          <fieldset className="fs-t">
            <div>{t("my_payment.end")}</div>
            <CusotmInput
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </fieldset>
          <fieldset className="fs-t">
            <div>{t("my_payment.keywords")}</div>
            <CusotmInput
              type="text"
              placeholder={t("my_payment.keywords_ph")}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </fieldset>
          <SmBlueButton className={styles.btn} onClick={handleClick}>
            {t("my_payment.btn")}
          </SmBlueButton>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>{t("my_payment.th.num")}</th>
                <th>{t("my_payment.th.acc")}</th>
                <th>{t("my_payment.th.acc_type")}</th>
                <th>{t("my_payment.th.date")}</th>
                <th>{t("my_payment.th.payment")}</th>
                <th>{t("my_payment.th.trans")}</th>
                <th>{t("my_payment.th.sum")}</th>
                <th>{t("my_payment.th.status")}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(filteredData).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value.server_account}</td>
                  <td>{value.account_currency}</td>
                  <td>
                    {new Date(value.creation_date * 1000).toLocaleDateString()}
                  </td>
                  <td>{value.payment_system}</td>
                  <td>{value.payment_type}</td>
                  <td>
                    {parseInt(value.account_value)
                      .toLocaleString("ru-RU", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                      .replace(",", ".")}{" "}
                    {value.account_currency}
                  </td>
                  <td>{value.status}</td>
                </tr>
              ))}
            </tbody>
            {payment.length === 0 && (
              <tfoot>
                <tr>
                  <td colSpan={10}>{t("tfoot")}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default MyPayments;
