import styles from "./conclusion.module.scss";
import { SmGreenButton } from "../../../components/buttons";
import { useCallback, useContext, useEffect, useState } from "react";
import DataCreate from "../../../components/data-create";
import LocalStorage from "../../../services/localStorage";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ErrorContext } from "../../../components/error-modal";

const Conclusion = () => {
  const [data, setData] = useState();
  const { i18n, t } = useTranslation();
  const { setError, setMessage } = useContext(ErrorContext);

  useEffect(() => {
    const { key, rand_param } = DataCreate();

    axios
      .get(
        "https://cabinet.itcyclonelp.com/api/v_2/payments/GetPaymentSystemsList",
        {
          params: {
            key,
            rand_param,
            auth_token: LocalStorage.get("auth_token"),
            user_id: LocalStorage.get("user_id"),
            languages: i18n.language,
            type: "in",
          },
        }
      )
      .then((e) => {
        if (e.data.result === "success") {
          setData(e.data.values);
          setError(false);
        } else {
          setError(true);
          setMessage(t("profile.error"));
        }
      });
  }, []);

  const costChange = useCallback((v) => {
    const numericValues = Object.values(v)
      ?.filter((value) => /^\d+%$/.test(value))
      .map((value) => parseInt(value, 10));

    const min = numericValues.length > 0 ? Math.min(...numericValues) : 0;
    const max = numericValues.length > 0 ? Math.max(...numericValues) : 0;

    return min !== max ? `${min}-${max}%` : `${min}%`;
  }, []);

  return (
    <>
      <h1>{t("conclusion_payment.h1")}</h1>
      <div className={`table ${styles.conclusion}`}>
        <table>
          <thead>
            <tr>
              <th>{t("conclusion_payment.th.payment")}</th>
              <th></th>
              <th>{t("conclusion_payment.th.val")}</th>
              <th>{t("conclusion_payment.th.com")}</th>
              <th>{t("conclusion_payment.th.trans")}</th>
              <th>{t("conclusion_payment.th.add")}</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.id}>
                <td className="flex-center">
                  <img
                    src={`https://cabinet.itcyclonelp.com${item.image}`}
                    alt="bank"
                    width={30}
                    height={30}
                  />
                  <div>{item.pay_method_name}</div>
                </td>
                <td></td>
                <td>{item.currency.join("/")}</td>
                <td>{costChange(item.costs)}</td>
                <td>{item.caption[i18n.language]}</td>
                <td>
                  <SmGreenButton>
                    <Link to={`/payment/transfer?id=${item.id}`}>
                      {t("conclusion_payment.btn")}
                    </Link>
                  </SmGreenButton>
                </td>
              </tr>
            ))}
          </tbody>
          {!data && (
            <tfoot>
              <tr>
                <td colSpan={10}>{t("tfoot")}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </>
  );
};

export default Conclusion;
