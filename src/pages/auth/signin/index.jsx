import styles from "./signin.module.scss";
import CustomInput from "../../../components/input";
import { BigButton } from "../../../components/buttons";
import { Link } from "react-router-dom";
import profileIcon from "../../../assets/images/signin/profile.svg";
import passIcon from "../../../assets/images/signin/pass.svg";
import errorIcon from "../../../assets/images/signin/error.svg";
import Language from "../../../components/language";
import axios from "axios";
import { useEffect, useState } from "react";
import DataCreate from "../../../utils/data-create";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../components/isAuth";

const SignIn = () => {
  const [disableBtn, setDisableBtn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { t } = useTranslation();
  const { login } = useAuth();

  useEffect(() => {
    document.title = t("signin.h1");
  }, []);

  const handleSubmite = (e) => {
    e.preventDefault();
    setDisableBtn(true);

    const { key, rand_param } = DataCreate();

    var bodyFormData = new FormData(e.target);
    bodyFormData.append("savePassword", true);
    bodyFormData.append("key", key);
    bodyFormData.append("rand_param", rand_param);

    axios
      .post("https://cabinet.itcyclonelp.com/api/v_2/page/Login", bodyFormData)
      .then((e) => {
        if (e.data.result === "success") {
          login(e.data.values.auth_token, e.data.values.user_id);
          setIsError(false);
        } else {
          setIsError(true);
        }
      })
      .finally(() => setDisableBtn(false));
  };

  return (
    <main className="auth_block flex-center">
      <div className="block">
        <Language />
        <h1>{t("signin.h1")}</h1>
        <form onSubmit={handleSubmite}>
          <fieldset className={styles.margin}>
            <img src={profileIcon} alt="email" width={20} height={20} />
            <CustomInput
              type="email"
              name="user_email"
              placeholder={t("signin.email")}
              error={isError}
            />
          </fieldset>
          <fieldset className={styles.margin}>
            <img src={passIcon} alt="password" width={20} height={20} />
            <CustomInput
              type="password"
              name="password"
              placeholder={t("signin.password")}
              error={isError}
            />
          </fieldset>
          <div className={`${styles.margin} justify-center`}>
            <Link to="/signup">{t("signin.reg")}</Link>
            <Link to="/reset-pass">{t("signin.forgot")}</Link>
          </div>
          {isError && (
            <div class="error">
              <img src={errorIcon} alt="(!)" />
              <span>{t("signin.error")}</span>
            </div>
          )}
          <BigButton className={styles.btn} disabled={disableBtn}>
            {t("signin.btn")}
          </BigButton>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
