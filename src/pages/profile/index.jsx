import CustomInput from "../../components/input";
import { SmBlueButton, BigButton } from "../../components/buttons";
import Selector from "../../components/selector";
import countryList from "../../utils/country";
import { useEffect, useState } from "react";
import Checkbox from "../../components/checkbox";
import styles from "./profile.module.scss";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const [countryKey, setCountryKey] = useState(
    navigator.language.split("-")[0].toLocaleUpperCase() || "US"
  );
  const [profile, setProfile] = useState();

  useEffect(() => {}, []);

  return (
    <>
      <h1 className="mt-3 mb-2">{t("profile.h1")}</h1>
      <form className={styles.block_data}>
        <div>
          <h2>{t("profile.block_1.h2")}</h2>
          <fieldset>
            <div>{t("profile.block_1.login")}</div>
            <div>Trader</div>
          </fieldset>
          <fieldset className="btn_z-index">
            <div>{t("profile.block_1.pass")}</div>
            <SmBlueButton>{t("profile.block_1.pass_btn")}</SmBlueButton>
          </fieldset>
          <fieldset>
            <div>E-Mail</div>
            <CustomInput
              type="email"
              name="email"
              placeholder={t("profile.block_1.email_ph")}
            />
          </fieldset>
          <fieldset>
            <div>{t("profile.block_1.surname")}</div>
            <CustomInput
              type="text"
              name="surname"
              placeholder={t("profile.block_1.surname_ph")}
            />
          </fieldset>
          <fieldset>
            <div>{t("profile.block_1.name")}</div>
            <CustomInput
              type="text"
              name="name"
              placeholder={t("profile.block_1.name_ph")}
            />
          </fieldset>
          <fieldset>
            <div>{t("profile.block_1.patronymic")}</div>
            <CustomInput
              type="text"
              name="patronymic"
              placeholder={t("profile.block_1.patronymic_ph")}
            />
          </fieldset>
          <fieldset>
            <div>{t("profile.block_1.passport")}</div>
            <CustomInput
              type="text"
              name="pasport"
              placeholder="XX XX YYYYYY"
            />
          </fieldset>
          <fieldset>
            <div>{t("profile.block_1.date")}</div>
            <CustomInput type="date" name="date" />
          </fieldset>
        </div>

        <div>
          <h2>{t("profile.block_2.h2")}</h2>
          <fieldset>
            <div>{t("profile.block_2.phone")}</div>
            <div>18172717181</div>
          </fieldset>
          <fieldset>
            <div>{t("profile.block_2.country")}</div>
            <Selector
              data={countryList}
              selected={countryKey}
              setSelected={setCountryKey}
            />
          </fieldset>
          <fieldset>
            <div>{t("profile.block_2.area")}</div>
            <CustomInput
              type="text"
              name="area"
              placeholder="Введите область"
            />
          </fieldset>
          <fieldset>
            <div>{t("profile.block_2.city")}</div>
            <CustomInput
              type="text"
              name="city"
              placeholder={t("profile.block_2.city_ph")}
            />
          </fieldset>
          <fieldset>
            <div>{t("profile.block_2.address")}</div>
            <CustomInput
              type="text"
              name="adress"
              placeholder={t("profile.block_2.address_ph")}
            />
          </fieldset>
          <fieldset>
            <div>{t("profile.block_2.postcode")}</div>
            <CustomInput
              type="text"
              name="index"
              placeholder={t("profile.block_2.postcode_ph")}
            />
          </fieldset>
        </div>

        <div>
          <h2>{t("profile.block_3.h2")}</h2>
          <fieldset>
            <div>{t("profile.block_3.check")}</div>
            <Checkbox />
          </fieldset>
          <fieldset>
            <div>{t("profile.block_3.lang")}</div>
            <Selector
              data={countryList}
              selected={countryKey}
              setSelected={setCountryKey}
            />
          </fieldset>
        </div>

        <div>
          <h2>{t("profile.block_4.h2")}</h2>
          <fieldset className="btn_z-index">
            <div>{t("profile.block_4.download")}</div>
            <SmBlueButton>{t("profile.block_4.download")}</SmBlueButton>
          </fieldset>
        </div>

        <div>
          <BigButton>{t("profile.btn")}</BigButton>
        </div>
      </form>
    </>
  );
};

export default Profile;
