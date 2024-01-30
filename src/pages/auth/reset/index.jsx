import styles from "./reset.module.scss";
import Language from "../../../components/language";
import CustomInput from "../../../components/input";
import email from "../../../assets/images/signin/email.svg";
import { NmGreenButton, SmBlueButton } from "../../../components/buttons";
import { Link } from "react-router-dom";

const ResetPass = () => {
  return (
    <main className="auth_block flex-center">
      <div className="block">
        <Language />
        <h1>Восстановление пароля</h1>
        <form>
          <fieldset className={styles.mb}>
            <img src={email} alt="email" width={20} height={15} />
            <CustomInput type="email" name="email" placeholder="Ваш e-mail" />
          </fieldset>
          <div className={`btn_z-index ${styles.block_btn}`}>
            <NmGreenButton>ОТПРАВИТЬ</NmGreenButton>
            <Link to="/" className={styles.link}>
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
