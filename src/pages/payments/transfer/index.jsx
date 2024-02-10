import { useEffect, useState } from "react";
import Selector from "../../../components/selector";
import CustomInput from "../../../components/input";
import { SmGreenButton } from "../../../components/buttons";
import styles from "./transfer.module.scss";
import sexData from "../../../utils/sex";
import { useSearchParams } from "react-router-dom";
import DataCreate from "../../../components/data-create";
import axios from "axios";
import LocalStorage from "../../../services/localStorage";
import { useTranslation } from "react-i18next";

const Transfer = () => {
  const [data, setData] = useState();
  const [searchParams] = useSearchParams();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const { key, rand_param } = DataCreate();

    axios
      .get(
        "https://cabinet.itcyclonelp.com/api/v_2/payments/GetPaymentSystemsUnitedByGroups",
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
        }
      });
  }, []);

  return (
    <>
      <h1>Bank transfer</h1>
      <div className={`item-center ${styles.block_transfer}`}>
        <div className={styles.info}>
          <div>Валюта: USD/EUR/RUB</div>
          <div>Комиссия: 5%</div>
          <div>Срок перевода: 1-5 work days</div>
        </div>
        <div className={styles.s_transfer}>
          <fieldset className="fs-t">
            <div>Счет</div>
            <Selector />
          </fieldset>
          <fieldset className="fs-t">
            <div>Валюта платежа</div>
            <Selector />
          </fieldset>
          <fieldset className={`flex-center ${styles.fs_lr}`}>
            <div>Сумма платежа</div>
            <CustomInput type="number" />
            <div>USD</div>
          </fieldset>
        </div>
        <SmGreenButton>ДАЛЕЕ</SmGreenButton>
      </div>
    </>
  );
};

export default Transfer;
