import styles from "./signin.module.scss";
import CustomInput from "../../../components/input";
import { BigButton } from "../../../components/buttons";
import { Link, useNavigate } from "react-router-dom";
import profileIcon from "../../../assets/images/signin/profile.svg";
import passIcon from "../../../assets/images/signin/pass.svg";
import errorIcon from "../../../assets/images/signin/error.svg";
import Language from "../../../components/language";
import axios from "axios";
import md5 from "md5";
import LocalStorage from "../../../services/localStorage";
import { useState } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const [disableBtn, setDisableBtn] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmite = (e) => {
    e.preventDefault();
    setDisableBtn(true);

    const randParam =
      Math.floor(Math.random() * (99999999 - 1000000 + 1)) + 1000000;
    const key = md5(`${"J4iFwfH4M2ae"}${randParam}`);

    var bodyFormData = new FormData(e.target);
    bodyFormData.append("savePassword", true);
    bodyFormData.append("key", key);
    bodyFormData.append("rand_param", randParam);

    axios
      .post("https://cabinet.itcyclonelp.com/api/v_2/page/Login", bodyFormData)
      .then((e) => {
        if (e.data.result === "success") {
          LocalStorage.set("auth_token", e.data.values.auth_token);
          navigate("/");
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
        <h1>Вход в личный кабинет</h1>
        <form onSubmit={handleSubmite}>
          <fieldset className={styles.margin}>
            <img src={profileIcon} alt="email" width={20} height={20} />
            <CustomInput
              type="email"
              name="user_email"
              placeholder="Логин или E-mail"
            />
          </fieldset>
          <fieldset className={styles.margin}>
            <img src={passIcon} alt="password" width={20} height={20} />
            <CustomInput type="password" name="password" placeholder="Пароль" />
          </fieldset>
          <div className={`${styles.margin} justify-center`}>
            <Link to="/signup">Регистрация</Link>
            <Link to="/reset-pass">Забыли пароль?</Link>
          </div>
          {isError && (
            <div class={styles.error}>
              <img src={errorIcon} alt="(!)" />
              <span class="ng-binding">Неверный email или пароль</span>
            </div>
          )}
          <BigButton className={styles.btn} disabled={disableBtn}>
            ВОЙТИ
          </BigButton>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
