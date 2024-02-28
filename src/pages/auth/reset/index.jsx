import styles from "./reset.module.scss";
import Language from "../../../components/language";
import CustomInput from "../../../components/input";
import email from "../../../assets/images/signin/email.svg";
import { NmGreenButton, SmBlueButton } from "../../../components/buttons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DataCreate from "../../../utils/data-create";
import { useEffect, useState } from "react";
import errorIcon from "../../../assets/images/signin/error.svg";
import { useTranslation } from "react-i18next";

const ResetPass = () => {
  const [disableBtn, setDisableBtn] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("forgot.h1");
  }, []);

  const SendReset = (e) => {
    e.preventDefault();

    setDisableBtn(true);

    const { key, rand_param } = DataCreate();

    var bodyFormData = new FormData();
    bodyFormData.append("key", key);
    bodyFormData.append("rand_param", rand_param);
    bodyFormData.append("user_email", e.target[1].value);

    axios
      .post(
        "https://cabinet.itcyclonelp.com/api/v_2/page/ForgotYourPassword",
        bodyFormData
      )
      .then((e) => {
        if (e.data.result === "success") {
          setError(false);
          navigate("/signin");
        } else {
          setError(true);
        }
      })
      .finally(() => setDisableBtn(false));
  };

  return (
    <main className="auth_block flex-center">
      <div className="block">
        <Language />
        <h1>{t("forgot.h1")}</h1>
        <form onSubmit={SendReset}>
          <fieldset className={styles.mb}>
            <img src={email} alt="email" width={20} height={15} />
            <CustomInput
              type="email"
              name="email"
              placeholder={t("forgot.email")}
              error={error}
            />
          </fieldset>
          {error && (
            <div class="error">
              <img src={errorIcon} alt="(!)" />
              <span class="ng-binding">{t("forgot.error")}</span>
            </div>
          )}
          <div className={`btn_z-index ${styles.block_btn}`}>
            <NmGreenButton className={styles.btn} disabled={disableBtn}>
              {t("forgot.btn_1")}
            </NmGreenButton>
            <Link to="/signin" className={styles.link}>
              <SmBlueButton className={styles.btn_last}>
                {t("forgot.btn_2")}
              </SmBlueButton>
            </Link>
          </div>
        </form>
        <p>{t("forgot.desc")}</p>
      </div>
    </main>
  );
};

export default ResetPass;
