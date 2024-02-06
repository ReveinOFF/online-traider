import styles from "./signin.module.scss";
import CustomInput from "../../../components/input";
import { BigButton } from "../../../components/buttons";
import { Link } from "react-router-dom";
import profileIcon from "../../../assets/images/signin/profile.svg";
import passIcon from "../../../assets/images/signin/pass.svg";
import Language from "../../../components/language";
import axios from "axios";
import { useTranslation } from "react-i18next";
import md5 from "md5";

const SignIn = () => {
  const { i18n } = useTranslation();

  const handleSubmite = (e) => {
    e.preventDefault();

    const randParam =
      Math.floor(Math.random() * (99999999 - 1000000 + 1)) + 1000000;
    const key = md5(`${"c5fbf67421b9519550dc356234ce76a6"}.${randParam}`);

    var bodyFormData = new FormData(e.target);
    // bodyFormData.append("savePassword", true);
    bodyFormData.append("key", key);
    bodyFormData.append("rand_param", randParam);
    // bodyFormData.append("languages", i18n.language);

    axios
      .post(
        "https://cabinet.itcyclonelp.com/api/v_2/page/Login",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((e) => {
        console.log(e);
      });
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
          <BigButton className={styles.btn}>ВОЙТИ</BigButton>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
