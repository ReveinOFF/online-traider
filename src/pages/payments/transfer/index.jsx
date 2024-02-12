import { useCallback, useEffect, useState } from "react";
import Selector from "../../../components/selector";
import CustomInput from "../../../components/input";
import { SmGreenButton } from "../../../components/buttons";
import styles from "./transfer.module.scss";
import { useSearchParams } from "react-router-dom";
import DataCreate from "../../../utils/data-create";
import axios from "axios";
import LocalStorage from "../../../services/localStorage";
import { useTranslation } from "react-i18next";

const Transfer = () => {
  const [data, setData] = useState();
  const [dataAcc, setDataAcc] = useState();
  const [dataCurr, setDataCurr] = useState();
  const [disabled, setDisabled] = useState(false);
  const [searchParams] = useSearchParams();
  const { t, i18n } = useTranslation();
  const [selectedCurr, setSelectedCurr] = useState("USD");
  const [selectedAcc, setSelectedAcc] = useState();
  const [money, setMoney] = useState();

  useEffect(() => {
    setDisabled(true);
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
          setData(
            e.data.values.find((item) => item.id === searchParams.get("id"))
          );
        }
      });

    axios
      .get("https://cabinet.itcyclonelp.com/api/v_2/settings/GetCurrencies", {
        params: {
          key,
          rand_param,
          auth_token: LocalStorage.get("auth_token"),
          user_id: LocalStorage.get("user_id"),
          languages: i18n.language,
          allCurrency: 1,
        },
      })
      .then((e) => {
        if (e.data.result === "success") {
          setDataCurr(e.data.values);
          setSelectedCurr(e.data.values[0].id);
        }
      });

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
          const values = e.data.values?.find(
            (item) => item.curr === selectedCurr
          );
          setDataAcc(e.data.values);
          setSelectedAcc(
            `${values?.server_account} (${values?.curr}) - ${values?.balance}`
          );
        }
      })
      .finally(() => setDisabled(false));
  }, []);

  const costChange = useCallback(
    (v) => {
      if (!v) return;

      const numericValues = Object.values(v)
        ?.filter((value) => /^\d+%$/.test(value))
        .map((value) => parseInt(value, 10));

      const min = numericValues.length > 0 ? Math.min(...numericValues) : 0;
      const max = numericValues.length > 0 ? Math.max(...numericValues) : 0;

      return min !== max ? `${min}-${max}%` : `${min}%`;
    },
    [dataAcc]
  );

  const handleClick = () => {};

  return (
    <>
      <h1>{t("transfer.h1")}</h1>
      <div className={`item-center ${styles.block_transfer}`}>
        <div className={styles.info}>
          <div>
            {t("transfer.i1")} {data?.currency.join("/")}
          </div>
          <div>
            {t("transfer.i2")} {costChange(data?.costs)}
          </div>
          <div>
            {t("transfer.i3")} {data?.caption[i18n.language]}
          </div>
        </div>
        <div className={styles.s_transfer}>
          <fieldset className="fs-t">
            <div>{t("transfer.select1")}</div>
            <Selector selected={selectedAcc}>
              {dataAcc
                ?.filter(
                  (el) =>
                    `${el.server_account} (${el.curr}) - ${el.balance}` !==
                    selectedAcc
                )
                .map((item) => (
                  <div
                    onClick={() =>
                      setSelectedAcc(
                        `${item.server_account} (${item.curr}) - ${item.balance}`
                      )
                    }
                    key={item.server_account}
                  >{`${item.server_account} (${item.curr}) - ${item.balance}`}</div>
                ))}
            </Selector>
          </fieldset>
          <fieldset className="fs-t">
            <div>{t("transfer.select2")}</div>
            <Selector
              selected={dataCurr?.find((item) => item.id === selectedCurr).code}
            >
              {dataCurr?.map((item) => (
                <div key={item.id} onClick={() => setSelectedCurr(item.id)}>
                  {item.code}
                </div>
              ))}
            </Selector>
          </fieldset>
          <fieldset className={`flex-center ${styles.fs_lr}`}>
            <div>{t("transfer.money")}</div>
            <CustomInput
              type="number"
              onChange={(e) => setMoney(e.target.value)}
            />
            <div>
              {dataCurr?.find((item) => item.id === selectedCurr)?.code}
            </div>
          </fieldset>
        </div>
        <SmGreenButton
          onClick={handleClick}
          disabled={disabled || !money || !selectedAcc || !selectedCurr}
        >
          {t("transfer.btn")}
        </SmGreenButton>
      </div>
    </>
  );
};

export default Transfer;
