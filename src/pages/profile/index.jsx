import CustomInput from "../../components/input";
import { SmBlueButton, BigButton } from "../../components/buttons";
import Selector from "../../components/selector";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./profile.module.scss";
import { useTranslation } from "react-i18next";
import axios from "axios";
import DataCreate from "../../components/data-create";
import LocalStorage from "../../services/localStorage";
import { ErrorContext } from "../../components/error-modal";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import ChangePass from "../../components/change_pass";

const Profile = () => {
  const { t } = useTranslation();
  const [showChangepass, setShowChangepass] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState();
  const [disableBtn, setDisableBtn] = useState(false);
  const [countryList, setСountryList] = useState();
  const [countryKey, setCountryKey] = useState(
    navigator.language.split("-")[0].toLocaleUpperCase() || "US"
  );
  const [profile, setProfile] = useState();
  const { setError, setMessage } = useContext(ErrorContext);
  const pasRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const { key, rand_param } = DataCreate();

    axios
      .get("https://cabinet.itcyclonelp.com/api/v_2/page/GetAccountInfo", {
        params: {
          key,
          rand_param,
          user_id: LocalStorage.get("user_id"),
          auth_token: LocalStorage.get("auth_token"),
        },
      })
      .then((e) => {
        if (e.data.result === "success") {
          setProfile(e.data.values);
          setError(false);
          formik.setValues(e.data.values);
          if (e.data.values.date_of_birth) {
            const date = new Date(e.data.values.date_of_birth * 1000);
            formik.setFieldValue(
              "date_of_birth",
              date.toISOString().split("T")[0]
            );
          }
        } else {
          setError(true);
          setMessage(t("profile.error"));
        }
      });
  }, []);

  useEffect(() => {
    const { key, rand_param } = DataCreate();

    axios
      .get("https://cabinet.itcyclonelp.com/api/v_2/settings/GetCountries", {
        params: {
          key,
          rand_param,
          auth_token: LocalStorage.get("auth_token"),
        },
      })
      .then((e) => {
        if (e.data.result === "success") {
          setСountryList(e.data.values);
        }
      });
  }, []);

  const UpdateSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("signup_valid.email"))
      .required(t("signup_valid.req"))
      .test("checkEmail", t("signup_valid.email_unique"), async (value) => {
        if (typingTimeout) clearTimeout(typingTimeout);
        return new Promise((resolve) => {
          setTypingTimeout(
            setTimeout(async () => {
              const { key, rand_param } = DataCreate();
              await axios
                .get(
                  "https://cabinet.itcyclonelp.com/api/v_2/page/EmailUnique",
                  { params: { key, rand_param, email: value } }
                )
                .then((res) => {
                  if (res.data.result === "success") return resolve(true);
                  else return resolve(false);
                });
            }, 500)
          );
        });
      }),
    date_of_birth: Yup.date()
      .transform(function (value, originalValue) {
        if (this.isType(value)) {
          return value;
        }
        const result = new Date(originalValue);
        return result;
      })
      .notRequired(),
    second_name: Yup.string().required(t("signup_valid.req")),
    first_name: Yup.string().required(t("signup_valid.req")),
    patronymic: Yup.string().notRequired(),
    passport: Yup.string().notRequired(),
    country: Yup.string().notRequired(),
    area: Yup.string().notRequired(),
    city: Yup.string().notRequired(),
    address: Yup.string().notRequired(),
    postcode: Yup.string().notRequired(),
  });

  const initialValues = {
    email: "",
  };

  const onHandleSubmit = (value) => {
    setDisableBtn(true);

    const { key, rand_param } = DataCreate();

    var bodyFormData = new FormData();
    bodyFormData.append("key", key);
    bodyFormData.append("rand_param", rand_param);
    bodyFormData.append("auth_token", LocalStorage.get("auth_token"));
    bodyFormData.append("user_id", LocalStorage.get("user_id"));
    Object.entries(value).forEach((element) => {
      bodyFormData.append(element[0], element[1]);
    });

    axios
      .post(
        "https://cabinet.itcyclonelp.com/api/v_2/page/UpdateAccountInfo",
        bodyFormData
      )
      .then((e) => {
        if (e.data.result === "success") {
          navigate("/signin");
          setError(false);
        } else {
          setError(true);
          setMessage(t("signup_valid.error"));
          Object.entries(e.data.errors).forEach((element) => {
            formik.setFieldError(element[0], t("signup_valid.error_any"));
          });
        }
      })
      .finally(() => setDisableBtn(false));
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: UpdateSchema,
    onSubmit: onHandleSubmit,
    validateOnChange: true,
  });

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    isValid,
    dirty,
  } = formik;

  return (
    <>
      <ChangePass show={showChangepass} setShow={setShowChangepass} />
      <h1 className="mt-3 mb-2">{t("profile.h1")}</h1>
      <FormikProvider value={formik}>
        <form className={styles.block_data} onSubmit={handleSubmit}>
          <div>
            <h2>{t("profile.block_1.h2")}</h2>
            <fieldset>
              <div>{t("profile.block_1.login")}</div>
              <div>{profile?.login}</div>
            </fieldset>
            <fieldset className="btn_z-index">
              <div>{t("profile.block_1.pass")}</div>
              <SmBlueButton
                onClick={() => setShowChangepass(true)}
                type="button"
              >
                {t("profile.block_1.pass_btn")}
              </SmBlueButton>
            </fieldset>
            <fieldset>
              <div>E-Mail</div>
              <CustomInput
                type="email"
                name="email"
                placeholder={t("profile.block_1.email_ph")}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
              />
            </fieldset>
            <fieldset>
              <div>{t("profile.block_1.surname")}</div>
              <CustomInput
                type="text"
                name="second_name"
                placeholder={t("profile.block_1.surname_ph")}
                value={values.second_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.second_name && errors.second_name}
              />
            </fieldset>
            <fieldset>
              <div>{t("profile.block_1.name")}</div>
              <CustomInput
                type="text"
                name="first_name"
                placeholder={t("profile.block_1.name_ph")}
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.first_name && errors.first_name}
              />
            </fieldset>
            <fieldset>
              <div>{t("profile.block_1.patronymic")}</div>
              <CustomInput
                type="text"
                name="patronymic"
                placeholder={t("profile.block_1.patronymic_ph")}
                value={values.patronymic}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.patronymic && errors.patronymic}
              />
            </fieldset>
            <fieldset>
              <div>{t("profile.block_1.passport")}</div>
              <CustomInput
                type="text"
                name="passport"
                placeholder="XX XX YYYYYY"
                value={values.passport}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.passport && errors.passport}
              />
            </fieldset>
            <fieldset>
              <div>{t("profile.block_1.date")}</div>
              <CustomInput
                type="date"
                name="date_of_birth"
                value={values.date_of_birth}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.date_of_birth && errors.date_of_birth}
              />
            </fieldset>
          </div>

          <div>
            <h2>{t("profile.block_2.h2")}</h2>
            <fieldset>
              <div>{t("profile.block_2.phone")}</div>
              <div>{profile?.phone}</div>
            </fieldset>
            <fieldset>
              <div>{t("profile.block_2.country")}</div>
              <Selector
                selected={
                  countryList?.find(
                    (item) => item.code === formik.values.country
                  )?.name
                }
              >
                {countryList
                  ?.filter((item) => item.code !== formik.values.country)
                  .map((item) => (
                    <div
                      key={item.id}
                      onClick={() => formik.setFieldValue("country", item.code)}
                    >
                      {item.name}
                    </div>
                  ))}
              </Selector>
            </fieldset>
            <fieldset>
              <div>{t("profile.block_2.area")}</div>
              <CustomInput
                type="text"
                name="area"
                placeholder="Введите область"
                value={values.area}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.area && errors.area}
              />
            </fieldset>
            <fieldset>
              <div>{t("profile.block_2.city")}</div>
              <CustomInput
                type="text"
                name="city"
                placeholder={t("profile.block_2.city_ph")}
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.city && errors.city}
              />
            </fieldset>
            <fieldset>
              <div>{t("profile.block_2.address")}</div>
              <CustomInput
                type="text"
                name="address"
                placeholder={t("profile.block_2.address_ph")}
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address && errors.address}
              />
            </fieldset>
            <fieldset>
              <div>{t("profile.block_2.postcode")}</div>
              <CustomInput
                type="text"
                name="postcode"
                placeholder={t("profile.block_2.postcode_ph")}
                value={values.postcode}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.postcode && errors.postcode}
              />
            </fieldset>
          </div>

          <div>
            <h2>{t("profile.block_3.h2")}</h2>
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
              <SmBlueButton onClick={() => pasRef.current.click()}>
                {t("profile.block_4.download")}
              </SmBlueButton>
              <input ref={pasRef} type="file" style={{ display: "none" }} />
            </fieldset>
          </div>

          <div>
            <BigButton
              className={!(dirty && isValid) || disableBtn}
              type="submit"
            >
              {t("profile.btn")}
            </BigButton>
          </div>
        </form>
      </FormikProvider>
    </>
  );
};

export default Profile;
