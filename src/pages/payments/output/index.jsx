import styles from "./output.module.scss";
import { SmGreenButton } from "../../../components/buttons";
import { useEffect, useState } from "react";
import DataCreate from "../../../utils/data-create";
import LocalStorage from "../../../services/localStorage";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Output = () => {
  const [data, setData] = useState();
  const { i18n, t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = t("output.h1");
  }, []);

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
            type: "out",
          },
        }
      )
      .then((e) => {
        if (e.data.result === "success") {
          setData(e.data.values);
        }
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1>{t("output.h1")}</h1>
      <div className={`table ${styles.output} ${styles.adaptive}`}>
        <table>
          <thead>
            <tr>
              <th>{t("output.th1")}</th>
              <th>{t("output.th2")}</th>
              <th>{t("output.th3")}</th>
              <th>{t("output.th4")}</th>
              <th>{t("output.th5")}</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.id}>
                <td className="flex-center" data-label={t("output.th1")}>
                  <img
                    src={`https://cabinet.itcyclonelp.com${item.image}`}
                    alt="bank"
                    width={30}
                    height={30}
                  />
                  <div>{item.name}</div>
                </td>
                <td data-label={t("output.th2")}>
                  <div>{Object.keys(item.currency)?.join("/")}</div>
                </td>
                <td data-label={t("output.th3")}>
                  <div>{item.costs[i18n.language]}</div>
                </td>
                <td data-label={t("output.th4")}>
                  <div>{item.caption[i18n.language]}</div>
                </td>
                <td data-label={t("output.th5")}>
                  <SmGreenButton>
                    <Link to={`/payment/withdrawal?id=${item.id}`}>
                      {t("output.btn")}
                    </Link>
                  </SmGreenButton>
                </td>
              </tr>
            ))}
          </tbody>
          {!data && (
            <tfoot>
              <tr>
                <td colSpan={5}>{loading ? t("load") : t("tfoot")}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </>
  );
};

export default Output;
