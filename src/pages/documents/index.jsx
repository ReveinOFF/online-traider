import { Link } from "react-router-dom";
import styles from "./documents.module.scss";
import { useTranslation } from "react-i18next";

const DocumentsAccount = () => {
  const { t } = useTranslation();

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
            <tr>
              <td>
                <div>
                  <div>Тут будет название документа</div>
                  <div>
                    <Link>{t("document.l_1")}</Link>
                    <Link>{t("document.l_2")}</Link>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DocumentsAccount;
