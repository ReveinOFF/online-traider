import styles from "./main.module.scss";
import CusotmInput from "../../../components/input";
import { SmBlueButton, SmGreenButton } from "../../../components/buttons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import DataCreate from "../../../components/data-create";
import LocalStorage from "../../../services/localStorage";
import { useTranslation } from "react-i18next";
import { ErrorContext } from "../../../components/error-modal";
import { Link, useNavigate } from "react-router-dom";

const MainAppeals = () => {
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [keywords, setKeywords] = useState("");
  const { t } = useTranslation();
  const { setError, setMessage, setSuccessMessage, setSuccess } =
    useContext(ErrorContext);
  const navigate = useNavigate();
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    const { key, rand_param } = DataCreate();

    axios
      .get("https://cabinet.itcyclonelp.com/api/v_2/partner/GetAllRequests", {
        params: {
          key,
          rand_param,
          auth_token: LocalStorage.get("auth_token"),
          user_id: LocalStorage.get("user_id"),
          resolved: 0,
        },
      })
      .then((e) => {
        if (e.data.result === "success") {
          setData(JSON.parse(e.data.values));
          setFilteredData(JSON.parse(e.data.values));
          setError(false);
        } else {
          setError(true);
          setMessage(t("profile.error"));
        }
      });
  }, []);

  const handleClick = () => {
    setBtnDisabled(true);

    if (keywords) {
      const { key, rand_param } = DataCreate();
      axios
        .get("https://cabinet.itcyclonelp.com/api/v_2/partner/GetAllRequests", {
          params: {
            key,
            rand_param,
            auth_token: LocalStorage.get("auth_token"),
            user_id: LocalStorage.get("user_id"),
            search_text: keywords,
          },
        })
        .then((e) => {
          if (e.data.result === "success") {
            console.log(e);
            setData(JSON.parse(e.data.values));
            setError(false);
            setSuccess(true);
            setSuccessMessage(t("appeals.search_succ"));
          } else {
            setError(true);
            setMessage(t("appeals.search_err"));
          }
        });
    }

    const filtered = data.filter((item) => {
      const startDateMatch = startDate
        ? new Date(item.date * 1000) >= new Date(startDate)
        : true;
      const endDateMatch = endDate
        ? new Date(item.date * 1000) <= new Date(endDate)
        : true;

      return startDateMatch && endDateMatch;
    });

    setFilteredData(filtered.length > 0 ? filtered : null);
    setBtnDisabled(false);
  };

  return (
    <>
      <h1>{t("appeals.h1")}</h1>
      <div className={styles.main_appeals}>
        <div className="justify-center mb-3">
          <SmGreenButton className={styles.t_btn}>
            <Link to="create">{t("appeals.btn1")}</Link>
          </SmGreenButton>
          <SmBlueButton className={styles.t_btn}>АРХИВ ОБРАЩЕНИЙ</SmBlueButton>
        </div>
        <div>
          <fieldset className="fs-t">
            <div>{t("appeals.start")}</div>
            <CusotmInput
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </fieldset>
          <fieldset className="fs-t">
            <div>{t("appeals.end")}</div>
            <CusotmInput
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </fieldset>
          <fieldset className="fs-t">
            <div>{t("appeals.keywords")}</div>
            <CusotmInput
              type="text"
              placeholder={t("appeals.keywords_ph")}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </fieldset>
          <SmBlueButton
            className={styles.btn}
            onClick={handleClick}
            disabled={btnDisabled}
          >
            {t("appeals.btn3")}
          </SmBlueButton>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>{t("appeals.theme")}</th>
                <th>{t("appeals.depart")}</th>
                <th>{t("appeals.date")}</th>
                <th>{t("appeals.last")}</th>
                <th>{t("appeals.status")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => navigate(`tickets?id=${item.id}`)}
                >
                  <td>{item.id}</td>
                  <td>{item.text}</td>
                  <td>{item.department_id}</td>
                  <td>{new Date(item.date * 1000).toLocaleDateString()}</td>
                  <td>
                    {item.message.length > 1
                      ? item.message
                      : item.file_name || item.message}
                  </td>
                  <td>{item.closed_by}</td>
                </tr>
              ))}
            </tbody>
            {filteredData.length === 0 && (
              <tfoot>
                <tr>
                  <td colSpan={6}>{t("tfoot")}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default MainAppeals;
