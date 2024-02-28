import styles from "./check.module.scss";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DataCreate from "../../../utils/data-create";
import axios from "axios";
import LocalStorage from "../../../services/localStorage";
import { useSearchParams } from "react-router-dom";
import convertMoney from "../../../utils/convertMoney";

const Check = () => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    document.title = t("check.h1");
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
          setData(
            Object.values(e.data.values).find(
              (item) => item.id === searchParams.get("id")
            )
          );
        }
      });
  }, []);

  return (
    <>
      <div className={`mt-3 item-center ${styles.check}`}>
        <div className="check_info mb-1">
          <div>{t("check.div1")}</div>
          <div>{data?.id}</div>
        </div>
        <div className="check_info mb-1">
          <div>{t("check.div2")}</div>
          <div>{data?.account_currency}</div>
        </div>
        <div className="check_info mb-1">
          <div>{t("check.div3")}</div>
          <div>{convertMoney(data?.account_value)}</div>
        </div>
        <div className="check_info mb-1">
          <div>{t("check.div4")}</div>
          <div>{data?.status}</div>
        </div>
        <div className="check_info">
          <div>{t("check.div5")}</div>
          <div>{new Date(data?.creation_date * 1000).toLocaleDateString()}</div>
        </div>
      </div>
    </>
  );
};

export default Check;
