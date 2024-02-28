import { useCallback, useContext, useEffect, useState } from "react";
import Selector from "../../../components/selector";
import CustomInput from "../../../components/input";
import { SmGreenButton } from "../../../components/buttons";
import styles from "./transfer.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import DataCreate from "../../../utils/data-create";
import axios from "axios";
import LocalStorage from "../../../services/localStorage";
import { useTranslation } from "react-i18next";
import convertMoney from "../../../utils/convertMoney";
import { ErrorContext } from "../../../components/error-modal";

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
  const navigate = useNavigate();
  const { setMessage, setError } = useContext(ErrorContext);

  useEffect(() => {
    document.title = t("transfer.h1");
  }, []);

  const getData = async () => {
    setDisabled(true);
    const { key, rand_param } = DataCreate();
    var tempData = null;

    await axios
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
          tempData = e.data.values.find(
            (item) => item.id === searchParams.get("id")
          );
        }
      });

    await axios
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
          const values = e.data.values?.filter((item) =>
            Object.keys(tempData.currency)?.includes(item.code)
          );
          setDataCurr(values.length > 0 ? values : e.data.values);
          setSelectedCurr(
            values.length > 0 ? values[0]?.id : e.data.values[0].id
          );
        }
      });

    await axios
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
          setSelectedAcc(e.data.values[0].account_id);
        }
      })
      .finally(() => setDisabled(false));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = () => {
    setDisabled(true);

    const { key, rand_param } = DataCreate();

    var bodyFormData = new FormData();
    bodyFormData.append("key", key);
    bodyFormData.append("rand_param", rand_param);
    bodyFormData.append("auth_token", LocalStorage.get("auth_token"));
    bodyFormData.append("value", money);
    bodyFormData.append("merchant_id", data.id);
    bodyFormData.append("account_id", selectedAcc);
    bodyFormData.append("currency_id", selectedCurr);
    bodyFormData.append("status", 0);

    axios
      .post(
        "https://cabinet.itcyclonelp.com/api/v_2/payments/CreateClaim",
        bodyFormData
      )
      .then((e) => {
        if (e.data.result === "success") {
          navigate(`/payment/check?id=${e.data.values.claim_id}`);
        } else {
          setError(true);
          setMessage(t("transfer.err_create"));
        }
      })
      .finally(() => setDisabled(false));
  };

  const convertDataAcc = useCallback(
    (data) =>
      `${data.server_account} (${data.curr}) - ${convertMoney(data?.balance)}`,
    []
  );

  return (
    <>
      <h1>{t("transfer.h1")}</h1>
      <div className={`item-center ${styles.block_transfer}`}>
        <div className={styles.info}>
          <div>
            {t("transfer.i1")}{" "}
            {(data && Object.keys(data?.currency)?.join("/")) || "-"}
          </div>
          <div>
            {t("transfer.i2")} {data?.costs[i18n.language]}
          </div>
          <div>
            {t("transfer.i3")} {data?.caption[i18n.language]}
          </div>
        </div>
        <div className={styles.s_transfer}>
          <fieldset className="fs-t">
            <div>{t("transfer.select1")}</div>
            <Selector
              selected={
                dataAcc &&
                convertDataAcc(
                  dataAcc?.find((item) => item.account_id === selectedAcc)
                )
              }
            >
              {dataAcc
                ?.filter((el) => dataAcc && convertDataAcc(el) !== selectedAcc)
                .map((item) => (
                  <div
                    onClick={() => setSelectedAcc(item.account_id)}
                    key={item.server_account}
                  >
                    {dataAcc && convertDataAcc(item)}
                  </div>
                ))}
            </Selector>
          </fieldset>
          <fieldset className="fs-t">
            <div>{t("transfer.select2")}</div>
            <Selector
              selected={
                dataCurr?.find((item) => item.id === selectedCurr)?.code
              }
              disabled={data?.currency.length === 0}
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
