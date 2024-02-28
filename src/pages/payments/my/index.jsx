import CusotmInput from "../../../components/input";
import { SmBlueButton } from "../../../components/buttons";
import styles from "./my.module.scss";
import axios from "axios";
import DataCreate from "../../../utils/data-create";
import LocalStorage from "../../../services/localStorage";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ErrorContext } from "../../../components/error-modal";
import convertMoney from "../../../utils/convertMoney";

const MyPayments = () => {
  const [payment, setPayment] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { i18n, t } = useTranslation();
  const refDateL = useRef();
  const refDateR = useRef();
  const { setError, setMessage } = useContext(ErrorContext);

  useEffect(() => {
    document.title = t("my_payment.h1");
  }, []);

  useEffect(() => {
    const { key, rand_param } = DataCreate();

    axios
      .get("https://cabinet.itcyclonelp.com/api/v_2/payments/GetUsersClaims", {
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
          setPayment(Object.values(e.data.values));
          setError(false);
          setFilteredData(Object.values(e.data.values));
        } else {
          setError(true);
          setMessage(t("profile.error"));
        }
      });
  }, []);

  const handleClick = () => {
    const filtered = payment.filter((item) => {
      const startDateMatch = startDate
        ? new Date(item.creation_date * 1000) >= new Date(startDate)
        : true;
      const endDateMatch = endDate
        ? new Date(item.creation_date * 1000) <= new Date(endDate)
        : true;

      return startDateMatch && endDateMatch;
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
              ref={refDateL}
              onChange={(e) => setStartDate(e.target.value)}
              onClick={() => refDateL.current.showPicker()}
            />
          </fieldset>
          <fieldset className="fs-t">
            <div>{t("my_payment.end")}</div>
            <CusotmInput
              type="date"
              ref={refDateR}
              onChange={(e) => setEndDate(e.target.value)}
              onClick={() => refDateR.current.showPicker()}
            />
          </fieldset>
          <SmBlueButton className={styles.btn} onClick={handleClick}>
            {t("my_payment.btn")}
          </SmBlueButton>
        </div>
        <div className={styles.adaptive}>
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
              {filteredData?.map((item) => (
                <tr key={item.id}>
                  <td data-label={t("my_payment.th.num")}>
                    <div>{item.account_id}</div>
                  </td>
                  <td data-label={t("my_payment.th.acc")}>
                    <div>{item.server_account}</div>
                  </td>
                  <td data-label={t("my_payment.th.acc_type")}>
                    <div>{item.account_type}</div>
                  </td>
                  <td data-label={t("my_payment.th.date")}>
                    <div>
                      {new Date(item.creation_date * 1000).toLocaleDateString()}
                    </div>
                  </td>
                  <td data-label={t("my_payment.th.payment")}>
                    <div>{item.payment_system}</div>
                  </td>
                  <td data-label={t("my_payment.th.trans")}>
                    <div>{item.payment_type}</div>
                  </td>
                  <td data-label={t("my_payment.th.sum")}>
                    <div>
                      {convertMoney(item.account_value)} {item.account_currency}
                    </div>
                  </td>
                  <td data-label={t("my_payment.th.status")}>
                    <div>{item.status}</div>
                  </td>
                </tr>
              ))}
            </tbody>
            {filteredData.length === 0 && (
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
