import styles from "./signin.module.scss";
import CustomInput from "../../../components/input";
import { BigButton } from "../../../components/buttons";
import { Link } from "react-router-dom";
import profileIcon from "../../../assets/images/signin/profile.svg";
import passIcon from "../../../assets/images/signin/pass.svg";
import Language from "../../../components/language";

const SignIn = () => {
  return (
    <main className="auth_block flex-center">
      <div className="block">
        <Language />
        <h1>Вход в личный кабинет</h1>
        <form>
          <fieldset className={styles.margin}>
            <img src={profileIcon} alt="email" width={20} height={20} />
            <CustomInput
              type="email"
              name="email"
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
