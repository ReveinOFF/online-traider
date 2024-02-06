import styles from "./reset.module.scss";
import Language from "../../../components/language";
import CustomInput from "../../../components/input";
import email from "../../../assets/images/signin/email.svg";
import { NmGreenButton, SmBlueButton } from "../../../components/buttons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DataCreate from "../../../components/data-create";
import { useState } from "react";
import errorIcon from "../../../assets/images/signin/error.svg";

const ResetPass = () => {
  const [disableBtn, setDisableBtn] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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
        <h1>Восстановление пароля</h1>
        <form onSubmit={SendReset}>
          <fieldset className={styles.mb}>
            <img src={email} alt="email" width={20} height={15} />
            <CustomInput
              type="email"
              name="email"
              placeholder="Ваш e-mail"
              error={error}
            />
          </fieldset>
          {error && (
            <div class="error">
              <img src={errorIcon} alt="(!)" />
              <span class="ng-binding">Некорректный email</span>
            </div>
          )}
          <div className={`btn_z-index ${styles.block_btn}`}>
            <NmGreenButton className={styles.btn} disabled={disableBtn}>
              ОТПРАВИТЬ
            </NmGreenButton>
            <Link to="/signin" className={styles.link}>
              <SmBlueButton className={styles.btn_last}>ОТМЕНИТЬ</SmBlueButton>
            </Link>
          </div>
        </form>
        <p>
          Чтобы сбросить ваш пароль, вам необходимо ввести email, указанный
          при регистрации. На ваш email будет отправлено письмо со ссылкой
          на изменение пароля.
        </p>
      </div>
    </main>
  );
};

export default ResetPass;
