import { useEffect, useState } from "react";
import styles from "./check.module.scss";
import { useTranslation } from "react-i18next";
import convertMoney from "../../utils/convertMoney";
import DataCreate from "../../utils/data-create";
import axios from "axios";
import LocalStorage from "../../services/localStorage";
import close from "../../assets/images/close.svg";

const CheckModal = ({ id, onClick }) => {
  const [data, setData] = useState();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (id) {
      const { key, rand_param } = DataCreate();

      axios
        .get(
          "https://cabinet.itcyclonelp.com/api/v_2/payments/GetUsersClaims",
          {
            params: {
              key,
              rand_param,
              auth_token: LocalStorage.get("auth_token"),
              user_id: LocalStorage.get("user_id"),
              languages: i18n.language,
            },
          }
        )
        .then((e) => {
          if (e.data.result === "success") {
            setData(
              Object.values(e.data.values).find((item) => item.id === id)
            );
          }
        });
    }
  }, [id]);

  return (
    <div className={styles.modal}>
      <div className={`item-center ${styles.check}`}>
        <img src={close} alt="close" width={15} height={15} onClick={onClick} />
        <div className={`${styles.check_info} mb-1`}>
          <div>{t("check.div1")}</div>
          <div>{data?.id}</div>
        </div>
        <div className={`${styles.check_info} mb-1`}>
          <div>{t("check.div2")}</div>
          <div>{data?.account_currency}</div>
        </div>
        <div className={`${styles.check_info} mb-1`}>
          <div>{t("check.div3")}</div>
          <div>{convertMoney(data?.account_value)}</div>
        </div>
        <div className={`${styles.check_info} mb-1`}>
          <div>{t("check.div4")}</div>
          <div>{data?.status}</div>
        </div>
        <div className={styles.check_info}>
          <div>{t("check.div5")}</div>
          <div>{new Date(data?.creation_date * 1000).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

export default CheckModal;
