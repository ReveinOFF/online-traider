import { BigButton } from "../../../components/buttons";
import Selector from "../../../components/selector";
import styles from "./open.module.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import DataCreate from "../../../utils/data-create";
import LocalStorage from "../../../services/localStorage";
import { useTranslation } from "react-i18next";
import { ErrorContext } from "../../../components/error-modal";
import { useNavigate, useSearchParams } from "react-router-dom";

const listLeverage = [
  "1",
  "5",
  "10",
  "33",
  "50",
  "100",
  "200",
  "400",
  "500",
  "1000",
];

const OpenAccount = () => {
  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [selected, setSelected] = useState();
  const [levSelected, setLevSelected] = useState();
  const { t, i18n } = useTranslation();
  const { setError, setMessage, setSuccessMessage, setSuccess } =
    useContext(ErrorContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setDisabled(true);
    const { key, rand_param } = DataCreate();

    axios
      .get(
        "https://cabinet.itcyclonelp.com/api/v_2/trading/TradingTypesAccountsList",
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
        setData(e.data.values);
        const value = e.data.values.find(
          (item) => item.account_id === searchParams.get("id")
        );
        setSelected(value?.group || e.data.values[0]?.group_on_server);
        setLevSelected(value?.leverage || e.data.values[0]?.leverage);
        if (e.data.values.length > 0) setDisabled(false);
      });
  }, []);

  const handleClick = () => {
    setDisabled(true);

    const { key, rand_param } = DataCreate();

    var formData = new FormData();
    formData.append("rand_param", rand_param);
    formData.append("key", key);
    formData.append("auth_token", LocalStorage.get("auth_token"));
    formData.append("user_id", LocalStorage.get("user_id"));
    formData.append("group_id", selected);
    formData.append("leverage", levSelected);

    axios
      .post(
        "https://cabinet.itcyclonelp.com/api/v_2/trading/RegisterTradeAccount",
        formData
      )
      .then((e) => {
        if (e.data.result === "success") {
          setSuccess(true);
          setSuccessMessage(t("trade_open.succ"));
          navigate("/trade/my");
        } else {
          setError(true);
          setMessage(t("trade_open.err"));
        }
      })
      .finally(() => setDisabled(false));
  };

  return (
    <>
      <h1>{t("trade_open.h1")}</h1>
      <div className={styles.open}>
        <fieldset>
          <div className={styles.type}>{t("trade_open.type")}</div>
          <Selector
            selected={
              data?.find((item) => item.group_on_server === selected)
                ?.group_name
            }
            disabled={data.length === 0 || data.length === 1}
          >
            {data
              ?.filter((item) => item.group_on_server !== selected)
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelected(item.group_on_server);
                    setLevSelected(item.leverage);
                  }}
                >
                  {item.group_name}
                </div>
              ))}
          </Selector>
        </fieldset>
        <fieldset>
          <div className={styles.type}>{t("trade_open.leverage")}</div>
          <Selector
            selected={`1:${levSelected}`}
            disabled={levSelected !== "0"}
          >
            {listLeverage.map((item, index) => (
              <div key={index} onClick={() => setLevSelected(item)}>
                {`1:${item}`}
              </div>
            ))}
          </Selector>
        </fieldset>
        <div className={`justify-center ${styles.btn}`}>
          <BigButton onClick={handleClick} disabled={disabled}>
            {t("trade_open.btn")}
          </BigButton>
        </div>
      </div>
    </>
  );
};

export default OpenAccount;
