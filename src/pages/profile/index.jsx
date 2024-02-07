import CustomInput from "../../components/input";
import { SmBlueButton, BigButton } from "../../components/buttons";
import Selector from "../../components/selector";
import countryList from "../../utils/country";
import { useEffect, useState } from "react";
import Checkbox from "../../components/checkbox";
import styles from "./profile.module.scss";

const Profile = () => {
  const [countryKey, setCountryKey] = useState(
    navigator.language.split("-")[0].toLocaleUpperCase() || "US"
  );
  const [profile, setProfile] = useState();

  useEffect(() => {}, []);

  return (
    <>
      <h1 className="mt-3 mb-2">Мой профиль</h1>
      <form className={styles.block_data}>
        <div>
          <h2>Персональные данные</h2>
          <fieldset>
            <div>Логин</div>
            <div>Trader</div>
          </fieldset>
          <fieldset className="btn_z-index">
            <div>Пароль</div>
            <SmBlueButton>Сменить пароль</SmBlueButton>
          </fieldset>
          <fieldset>
            <div>E-Mail</div>
            <CustomInput
              type="email"
              name="email"
              placeholder="Введите e-mail"
            />
          </fieldset>
          <fieldset>
            <div>Фамилия</div>
            <CustomInput
              type="text"
              name="surname"
              placeholder="Введите фамилию"
            />
          </fieldset>
          <fieldset>
            <div>Имя</div>
            <CustomInput type="text" name="name" placeholder="Введите имя" />
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
            <div>Дата рождения</div>
            <CustomInput type="date" name="date" />
          </fieldset>
        </div>

        <div>
          <h2>Контакты</h2>
          <fieldset>
            <div>Телефон</div>
            <div>18172717181</div>
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
            <CustomInput type="text" name="city" placeholder="Введите город" />
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

        <div>
          <h2>Настройки профиля</h2>
          <fieldset>
            <div>Дублирование на email</div>
            <Checkbox />
          </fieldset>
          <fieldset>
            <div>Язык по умолчанию</div>
            <Selector
              data={countryList}
              selected={countryKey}
              setSelected={setCountryKey}
            />
          </fieldset>
        </div>

        <div>
          <h2>Паспорт и документы</h2>
          <fieldset className="btn_z-index">
            <div>Загрузить</div>
            <SmBlueButton>Загрузить файл</SmBlueButton>
          </fieldset>
        </div>

        <div>
          <BigButton>РЕДАКТИРОВАНИЕ</BigButton>
        </div>
      </form>
    </>
  );
};

export default Profile;
