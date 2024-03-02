import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import Selector from "../../../components/selector";
import CustomInput from "../../../components/input";
import { SmGreenButton } from "../../../components/buttons";
import { useNavigate, useSearchParams } from "react-router-dom";
import DataCreate from "../../../utils/data-create";
import axios from "axios";
import LocalStorage from "../../../services/localStorage";
import { useTranslation } from "react-i18next";
import convertMoney from "../../../utils/convertMoney";
import { ErrorContext } from "../../../components/error-modal";
import styles from "./withdrawal.module.scss";

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.name };
    case "num":
      return { ...state, num: action.num };
    case "fio":
      return { ...state, fio: action.fio };
    case "cntr":
      return { ...state, cntr: action.cntr };
    case "adrs":
      return { ...state, adrs: action.adrs };
    case "swift":
      return { ...state, swift: action.swift };
    case "adrsb":
      return { ...state, adrsb: action.adrsb };
    case "swiftb":
      return { ...state, swiftb: action.swiftb };
    case "bnkc":
      return { ...state, bnkc: action.bnkc };
    case "adrsc":
      return { ...state, adrsc: action.adrsc };
    case "numc":
      return { ...state, numc: action.numc };
    case "iban":
      return { ...state, iban: action.iban };
    default:
      return state;
  }
};

const reducer2 = (state, action) => {
  switch (action.type) {
    case "num2":
      return { ...state, num2: action.num2 };
    case "fio2":
      return { ...state, fio2: action.fio2 };
    case "tim2":
      return { ...state, tim2: action.tim2 };
    default:
      return state;
  }
};

const Withdrawal = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState();
  const [dataAcc, setDataAcc] = useState();
  const [dataCurr, setDataCurr] = useState();
  const [disabled, setDisabled] = useState(false);
  const [exchanges, setExchanges] = useState();
  const [searchParams] = useSearchParams();
  const [selectedCurr, setSelectedCurr] = useState("USD");
  const [selectedCard, setSelectedCard] = useState("Visa");
  const [selectedAcc, setSelectedAcc] = useState();
  const [addressM, setAddressM] = useState();
  const [money, setMoney] = useState();
  const [money2, setMoney2] = useState();
  const navigate = useNavigate();
  const { setMessage, setError } = useContext(ErrorContext);
  const [store, dispatch] = useReducer(reducer, {
    name: "",
    num: "",
    fio: "",
    cntr: "",
    adrs: "",
    swift: "",
    adrsb: "",
    swiftb: "",
    bnkc: "",
    iban: "",
    adrsc: "",
    numc: "",
  });
  const [store2, dispatch2] = useReducer(reducer2, {
    num2: "",
    fio2: "",
    tim2: "",
  });

  useEffect(() => {
    document.title = t("withdrawal.h1");
  }, []);

  const getData = async () => {
    setDisabled(true);
    const { key, rand_param } = DataCreate();
    var tempData = null;

    await axios
      .get(
        "https://cabinet.itcyclonelp.com/api/v_2/settings/GetExchangeRates",
        {
          params: {
            key,
            rand_param,
            auth_token: LocalStorage.get("auth_token"),
            user_id: LocalStorage.get("user_id"),
            languages: i18n.language,
            format: 2,
          },
        }
      )
      .then((e) => {
        if (e.data.result === "success") {
          setExchanges(Object.entries(e.data.values));
        }
      });

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
            type: "out",
          },
        }
      )
      .then((e) => {
        if (e.data.result === "success") {
          const val = e.data.values.find(
            (item) => item.id === searchParams.get("id")
          );
          setData(val);
          tempData = val;
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
    bodyFormData.append("merchant_id", data.id);
    bodyFormData.append("claim[account_value]", money);
    bodyFormData.append("claim[account_id]", selectedAcc);
    bodyFormData.append("claim[currency_id]", selectedCurr);

    switch (data.name) {
      case "bank":
        bodyFormData.append("claim[bank_name]", store.name);
        bodyFormData.append("claim[card_number]", store.num);
        bodyFormData.append("claim[payee_fio]", store.fio);
        bodyFormData.append("claim[iban]", store.iban);
        bodyFormData.append("claim[payee_living_site]", store.cntr);
        bodyFormData.append("claim[payee_address]", store.adrs);
        bodyFormData.append("claim[swift]", store.swift);
        bodyFormData.append("claim[bank_address]", store.adrsb);
        bodyFormData.append("claim[correspondent_swift]", store.swiftb);
        bodyFormData.append("claim[bank_correspondent]", store.bnkc);
        bodyFormData.append("claim[correspondent_address]", store.adrsc);
        bodyFormData.append("claim[correspondent_payee_account]", store.numc);
      case "card":
        bodyFormData.append(
          "claim[pay_method]",
          selectedCard.toLocaleLowerCase()
        );
        bodyFormData.append("claim[card_num]", store2.num2);
        bodyFormData.append("claim[fio]", store2.fio2);
        bodyFormData.append("claim[expiration_date]", store2.tim2);
      case "crypto":
        bodyFormData.append(
          "claim[pay_method]",
          selectedCard.toLocaleLowerCase()
        );
        bodyFormData.append("claim[wallet]", addressM);
    }

    axios
      .post(
        "https://cabinet.itcyclonelp.com/api/v_2/payments/SetTakeout",
        bodyFormData
      )
      .then((e) => {
        if (e.data.result === "success") {
          navigate(`/payment/output`);
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

  const curse = useMemo(() => {
    const data = exchanges?.find(
      (item) =>
        item[0] ===
        `${dataAcc?.find((item) => item.account_id === selectedAcc)?.curr}${
          dataCurr?.find((item) => item.id === selectedCurr)?.code
        }`.toLocaleUpperCase()
    );

    return data ? data[1].bank : null;
  }, [exchanges, dataAcc, dataCurr, selectedAcc, selectedCurr]);

  return (
    <>
      <h1>{data?.caption[i18n.language]}</h1>
      <div className={`item-center ${styles.block_withdrawal}`}>
        <div className={styles.info}>
          <div>
            {t("transfer.i1")}{" "}
            {(data && Object.keys(data?.currency)?.join("/")) || "-"}
          </div>
          <div>
            {t("transfer.i2")} {data?.costs[i18n.language] || "0%"}
          </div>
          <div>
            {t("transfer.i3")} {data?.caption[i18n.language]}
          </div>
        </div>
        <div className={styles.s_transfer}>
          <fieldset className="fs-t mb-2">
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
          <fieldset className="fs-t" style={{ marginBottom: 40 }}>
            <div>{t("withdrawal.fs1")}</div>
            <Selector
              selected={
                dataCurr?.find((item) => item.id === selectedCurr)?.code
              }
              disabled={
                Object.values(data?.currency || [])?.length === 0 ||
                Object.values(data?.currency || [])?.length === 1
              }
            >
              {dataCurr?.map((item) => (
                <div key={item.id} onClick={() => setSelectedCurr(item.id)}>
                  {item.code}
                </div>
              ))}
            </Selector>
          </fieldset>
          <fieldset className={`flex-center mb-3 ${styles.fs_lr}`}>
            <div>{t("withdrawal.fs2")}</div>
            <CustomInput
              type="number"
              value={money}
              onChange={(e) => {
                setMoney(e.target.value);

                if (data?.name === "crypto")
                  setMoney2((e.target.value / curse).toFixed(4));
              }}
            />
            <div>
              {dataAcc?.find((item) => item.account_id === selectedAcc).curr}
            </div>
          </fieldset>
          {data?.name === "bank" && (
            <>
              <fieldset
                className={`fs-t ${styles.f}`}
                style={{ marginTop: 20 }}
              >
                <div>{t("withdrawal.fs3")}</div>
                <CustomInput
                  type="text"
                  value={store.name}
                  onChange={(e) =>
                    dispatch({ type: "name", name: e.target.value })
                  }
                />
              </fieldset>
              <fieldset
                className={`fs-t ${styles.f}`}
                style={{ marginTop: 20 }}
              >
                <div>{t("withdrawal.fs4")}</div>
                <CustomInput
                  type="text"
                  value={store.num}
                  onChange={(e) =>
                    dispatch({ type: "num", num: e.target.value })
                  }
                />
              </fieldset>
              <fieldset
                className={`fs-t ${styles.f}`}
                style={{ marginTop: 20 }}
              >
                <div>{t("withdrawal.fs5")}</div>
                <CustomInput
                  type="text"
                  value={store.fio}
                  onChange={(e) =>
                    dispatch({ type: "fio", fio: e.target.value })
                  }
                />
              </fieldset>
              <fieldset
                className={`fs-t ${styles.f}`}
                style={{ marginTop: 20 }}
              >
                <div>{t("withdrawal.fs6")}</div>
                <CustomInput
                  type="text"
                  value={store.cntr}
                  onChange={(e) =>
                    dispatch({ type: "cntr", cntr: e.target.value })
                  }
                />
              </fieldset>
              <fieldset
                className={`fs-t ${styles.f}`}
                style={{ marginTop: 20 }}
              >
                <div>{t("withdrawal.fs7")}</div>
                <CustomInput
                  type="text"
                  value={store.adrs}
                  onChange={(e) =>
                    dispatch({ type: "adrs", adrs: e.target.value })
                  }
                />
              </fieldset>
              <fieldset
                className={`fs-t ${styles.f}`}
                style={{ marginTop: 20 }}
              >
                <div>{t("withdrawal.fs8")}</div>
                <CustomInput
                  type="text"
                  value={store.swift}
                  onChange={(e) =>
                    dispatch({ type: "swift", swift: e.target.value })
                  }
                />
              </fieldset>
              <fieldset
                className={`fs-t ${styles.f}`}
                style={{ marginTop: 20 }}
              >
                <div>{t("withdrawal.fs9")}</div>
                <CustomInput
                  type="text"
                  value={store.adrsb}
                  onChange={(e) =>
                    dispatch({ type: "adrsb", adrsb: e.target.value })
                  }
                />
              </fieldset>
              <fieldset
                className={`fs-t ${styles.f}`}
                style={{ marginTop: 20 }}
              >
                <div>{t("withdrawal.fs10")}</div>
                <CustomInput
                  type="text"
                  value={store.swiftb}
                  onChange={(e) =>
                    dispatch({ type: "swiftb", swiftb: e.target.value })
                  }
                />
              </fieldset>
              <fieldset
                className={`fs-t ${styles.f}`}
                style={{ marginTop: 20 }}
              >
                <div>{t("withdrawal.fs11")}</div>
                <CustomInput
                  type="text"
                  value={store.bnkc}
                  onChange={(e) =>
                    dispatch({ type: "bnkc", bnkc: e.target.value })
                  }
                />
              </fieldset>
              <fieldset
                className={`fs-t ${styles.f}`}
                style={{ marginTop: 20 }}
              >
                <div>{t("withdrawal.fs12")}</div>
                <CustomInput
                  type="text"
                  value={store.adrsc}
                  onChange={(e) =>
                    dispatch({ type: "adrsc", adrsc: e.target.value })
                  }
                />
              </fieldset>
              <fieldset
                className={`fs-t ${styles.f}`}
                style={{ marginTop: 20 }}
              >
                <div>Iban</div>
                <CustomInput
                  type="text"
                  value={store.iban}
                  onChange={(e) =>
                    dispatch({ type: "iban", iban: e.target.value })
                  }
                />
              </fieldset>
              <fieldset
                className={`fs-t ${styles.f}`}
                style={{ marginTop: 20 }}
              >
                <div>{t("withdrawal.fs13")}</div>
                <CustomInput
                  type="text"
                  value={store.numc}
                  onChange={(e) =>
                    dispatch({ type: "numc", numc: e.target.value })
                  }
                />
              </fieldset>
            </>
          )}
          {data?.name === "card" && (
            <>
              <fieldset className="fs-t" style={{ marginBottom: 20 }}>
                <div>{t("withdrawal.f2s1")}</div>
                <Selector selected={selectedCard}>
                  {selectedCard === "Visa" ? (
                    <div onClick={() => setSelectedCard("MasterCard")}>
                      MasterCard
                    </div>
                  ) : (
                    <div onClick={() => setSelectedCard("Visa")}>Visa</div>
                  )}
                </Selector>
              </fieldset>
              <fieldset
                className={`fs-t ${styles.f}`}
                style={{ marginBottom: 20 }}
              >
                <div>{t("withdrawal.f2s2")}</div>
                <CustomInput
                  type="text"
                  value={store2.num2}
                  onChange={(e) =>
                    dispatch2({ type: "num2", num2: e.target.value })
                  }
                />
              </fieldset>
              <fieldset
                className={`fs-t ${styles.f}`}
                style={{ marginBottom: 20 }}
              >
                <div>{t("withdrawal.f2s3")}</div>
                <CustomInput
                  type="text"
                  value={store2.fio2}
                  onChange={(e) =>
                    dispatch2({ type: "fio2", fio2: e.target.value })
                  }
                />
              </fieldset>
              <fieldset className={`fs-t ${styles.f}`}>
                <div>{t("withdrawal.f2s4")}</div>
                <CustomInput
                  type="text"
                  value={store2.tim2}
                  onChange={(e) =>
                    dispatch2({ type: "tim2", tim2: e.target.value })
                  }
                />
              </fieldset>
            </>
          )}
          {data?.name === "crypto" && (
            <>
              <fieldset
                className={`flex-center ${styles.fs_lr}`}
                style={{ marginInline: "auto" }}
              >
                <div>{t("withdrawal.fs2_2")}</div>
                <CustomInput
                  type="number"
                  value={money2}
                  onChange={(e) => {
                    setMoney2(e.target.value);

                    if (data?.name === "crypto")
                      setMoney((e.target.value * curse).toFixed(4));
                  }}
                />
                <div>
                  {dataCurr?.find((item) => item.id === selectedCurr)?.code}
                </div>
              </fieldset>
              <fieldset
                className={`fs-t ${styles.f}`}
                style={{ marginTop: 20 }}
              >
                <div>{t("withdrawal.adrs")}</div>
                <CustomInput
                  type="text"
                  value={addressM}
                  onChange={(e) => setAddressM(e.target.value)}
                />
              </fieldset>
              <p style={{ textAlign: "start", marginTop: 30 }}>
                {t("withdrawal.curs")} {curse}
              </p>
            </>
          )}
        </div>
        <SmGreenButton
          onClick={handleClick}
          disabled={disabled || !money || !selectedAcc || !selectedCurr}
          style={{ marginBottom: 30, marginTop: 40 }}
        >
          {t("withdrawal.btn")}
        </SmGreenButton>
      </div>
    </>
  );
};

export default Withdrawal;
