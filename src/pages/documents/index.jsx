import { Link } from "react-router-dom";
import styles from "./documents.module.scss";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import DataCreate from "../../components/data-create";
import { ErrorContext } from "../../components/error-modal";

const DocumentsAccount = () => {
  const [data, setData] = useState();
  const { i18n, t } = useTranslation();
  const { setError, setMessage } = useContext(ErrorContext);

  useEffect(() => {
    const { key, rand_param } = DataCreate();

    axios
      .get("https://cabinet.itcyclonelp.com/api/v_2/page/GetSystemDocuments", {
        params: {
          key,
          rand_param,
          languages: i18n.language,
        },
      })
      .then((e) => {
        if (e.data.result === "success") {
          setData(Object.entries(e.data.values));
        } else {
          setError(true);
          setMessage(t("profile.error"));
        }
      });
  }, []);

  return (
    <>
      <h1>{t("document.h1")}</h1>
      <div className={styles.documents}>
        <table>
          <thead>
            <tr>
              <th>{t("document.t_n")}</th>
            </tr>
          </thead>
          <tbody>
            {data?.map(([key, value]) => (
              <tr key={key}>
                <td>
                  <div>
                    <div>{value.name}</div>
                    <div>
                      <Link
                        target="_blank"
                        to={`https://cabinet.itcyclonelp.com/public/documents/${value.link}.pdf`}
                      >
                        {t("document.l_1")}
                      </Link>
                      <Link
                        target="_blank"
                        to={`https://cabinet.itcyclonelp.com/public/documents/${value.link}.pdf`}
                      >
                        {t("document.l_2")}
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DocumentsAccount;
