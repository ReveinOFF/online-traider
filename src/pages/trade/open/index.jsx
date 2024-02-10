import { BigButton } from "../../../components/buttons";
import Selector from "../../../components/selector";
import styles from "./open.module.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import DataCreate from "../../../components/data-create";
import LocalStorage from "../../../services/localStorage";
import { useTranslation } from "react-i18next";
import { ErrorContext } from "../../../components/error-modal";
import { useNavigate } from "react-router-dom";

const listLeverage = [1, 5, 10, 33, 50, 100, 200, 400, 500, 1000];

const OpenAccount = () => {
  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [selected, setSelected] = useState();
  const [levSelected, setLevSelected] = useState();
  const { t, i18n } = useTranslation();
  const { setError, setMessage, setSuccessMessage, setSuccess } =
    useContext(ErrorContext);
  const navigate = useNavigate();

  useEffect(() => {
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
        setSelected(e.data.values[0].id);
        setLevSelected(e.data.values[0]?.leverage);
      });
  }, []);

  const handleClick = () => {
    setDisabled(true);

    const { key, rand_param } = DataCreate();
    const select = data?.find((item) => item.id === selected);

    var formData = new FormData();
    formData.append("rand_param", rand_param);
    formData.append("key", key);
    formData.append("auth_token", LocalStorage.get("auth_token"));
    formData.append("user_id", LocalStorage.get("user_id"));
    formData.append("group_id", selected);
    formData.append("leverage", select?.leverage);

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
            selected={data?.find((item) => item.id === selected)?.group_name}
          >
            {data
              ?.filter((item) => item.id !== selected)
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelected(item.id);
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
          <Selector selected={"1:" + levSelected} disabled={levSelected > 0}>
            {listLeverage.map((item, index) => (
              <div key={index} onClick={() => setLevSelected(item)}>
                {item}
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
