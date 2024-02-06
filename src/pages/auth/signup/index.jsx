import styles from "./signup.module.scss";
import CustomInput from "../../../components/input";
import Footer from "../../../components/footer";
import Selector from "../../../components/selector";
import Captcha from "../../../components/captcha";
import close from "../../../assets/images/close.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import countryList from "../../../utils/country";
import sexData from "../../../utils/sex";

const SignUp = () => {
  const [captchaValid, setCaptchaValid] = useState(false);
  const [sexKey, setSexKey] = useState();
  const [countryKey, setCountryKey] = useState(
    navigator.language.split("-")[0].toLocaleUpperCase() || "US"
  );
  const navigate = useNavigate();

  return (
    <>
      <main className={`flex-center ${styles.signup}`}>
        <div>
          <img
            src={close}
            alt="close"
            width={16}
            height={16}
            onClick={() => navigate("/signin")}
          />

          <h1>Регистрация</h1>
          <p>
            Регистрация займет всего несколько минут и позволит вам получить
            доступ к личному кабинету. Поля, отмеченные *, обязательны для
            заполнения
          </p>

          <form>
            <div>
              <h2>Учетная запись</h2>
              <fieldset>
                <div>E-Mail *</div>
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Введите e-mail"
                />
              </fieldset>
              <fieldset>
                <div>Пароль *</div>
                <CustomInput
                  type="password"
                  name="pass"
                  placeholder="Введите пароль"
                />
              </fieldset>
              <fieldset>
                <div>Повторите новый пароль *</div>
                <CustomInput
                  type="password"
                  name="confpass"
                  placeholder="Повторите пароль"
                />
              </fieldset>
              <fieldset>
                <div>Дата рождения</div>
                <CustomInput type="date" name="date" />
              </fieldset>
            </div>

            <div>
              <h2>Учетная запись</h2>
              <fieldset>
                <div>Фамилия *</div>
                <CustomInput
                  type="text"
                  name="surname"
                  placeholder="Введите фамилию"
                />
              </fieldset>
              <fieldset>
                <div>Имя *</div>
                <CustomInput
                  type="text"
                  name="name"
                  placeholder="Введите имя"
                />
              </fieldset>
              <fieldset>
                <div>Отчество</div>
                <CustomInput
                  type="text"
                  name="patronymic"
                  placeholder="Введите отчество"
                />
              </fieldset>
              <fieldset>
                <div>Паспорт</div>
                <CustomInput
                  type="text"
                  name="pasport"
                  placeholder="XX XX YYYYYY"
                />
              </fieldset>
              <fieldset>
                <div>Пол</div>
                <Selector
                  data={sexData}
                  selected={sexKey}
                  setSelected={setSexKey}
                  emptyMsg="Не указан"
                />
              </fieldset>
            </div>

            <div>
              <h2>Контакты</h2>
              <fieldset>
                <div>Телефон *</div>
                <CustomInput
                  type="tel"
                  name="phone"
                  placeholder="Введите номер телефона"
                  pattern="+[0-9]*"
                />
              </fieldset>
              <fieldset>
                <div>Страна</div>
                <Selector
                  data={countryList}
                  selected={countryKey}
                  setSelected={setCountryKey}
                />
              </fieldset>
              <fieldset>
                <div>Область</div>
                <CustomInput
                  type="text"
                  name="area"
                  placeholder="Введите область"
                />
              </fieldset>
              <fieldset>
                <div>Город</div>
                <CustomInput
                  type="text"
                  name="city"
                  placeholder="Введите город"
                />
              </fieldset>
              <fieldset>
                <div>Адрес</div>
                <CustomInput
                  type="text"
                  name="adress"
                  placeholder="Введите адрес"
                />
              </fieldset>
              <fieldset>
                <div>Почтовый индекс</div>
                <CustomInput
                  type="text"
                  name="index"
                  placeholder="Введите почтовый индекс"
                />
              </fieldset>
            </div>

            <div className={styles.last_block}>
              <h2 className={styles.last_h2}>Контакты</h2>
              <Captcha setCaptchaValid={setCaptchaValid} />
              <button>ЗАРЕГИСТРИРОВАТЬСЯ</button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SignUp;
