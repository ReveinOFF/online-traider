import styles from "./signup.module.scss";
import CustomInput from "../../../components/input";
import Footer from "../../../components/footer";
import Selector from "../../../components/selector";
import close from "../../../assets/images/close.svg";
import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import sexData from "../../../utils/sex";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import axios from "axios";
import DataCreate from "../../../components/data-create";
import LocalStorage from "../../../services/localStorage.js";
import reload from "../../../assets/images/reload.svg";
import { ErrorContext } from "../../../components/error-modal/index.jsx";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const [typingTimeout, setTypingTimeout] = useState();
  const [countryList, setСountryList] = useState();
  const [countrySelected, setCountrySelected] = useState();
  const [sexSelected, setSexSelected] = useState();
  const [disableBtn, setDisableBtn] = useState(false);
  const { setMessage, setError } = useContext(ErrorContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const canvasRef = useRef(null);
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [showError, setShowError] = useState(false);

  const generateCaptchaText = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 6;
    let text = "";
    for (let i = 0; i < length; i++) {
      text += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return text;
  };

  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "blue";
    ctx.font = "italic 24px Arial";

    const text = generateCaptchaText();
    setCaptchaText(text);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillText(text, 10, 35);
  };

  useEffect(() => {
    drawCaptcha();
  }, []);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    setIsCaptchaValid(false);
    setShowError(false);
  };

  const onHandleSubmit = (value) => {
    setDisableBtn(true);

    if (userInput !== captchaText) {
      setIsCaptchaValid(false);
      setShowError(true);
      drawCaptcha();
      setDisableBtn(false);
      return;
    }
    setIsCaptchaValid(true);
    setShowError(false);

    const { key, rand_param } = DataCreate();

    var bodyFormData = new FormData();
    bodyFormData.append("key", key);
    bodyFormData.append("rand_param", rand_param);
    Object.entries(value).forEach((element) => {
      bodyFormData.append(element[0], element[1]);
    });

    axios
      .post(
        "https://cabinet.itcyclonelp.com/api/v_2/page/RegisterUser",
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
          setCountrySelected(e.data.values[0].name);
        }
      });
  }, []);

  const SignupSchema = Yup.object().shape({
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
    password: Yup.string()
      .required(t("signup_valid.req"))
      .min(8, t("signup_valid.pass_min"))
      .matches(/^(?=.*[A-Z])/, t("signup_valid.pass_u"))
      .matches(/(?=.*[a-z])/, t("signup_valid.pass_l"))
      .matches(/(?=.*[0-9])/, t("signup_valid.pass_n")),
    password_repeat: Yup.string()
      .required(t("signup_valid.req"))
      .oneOf([Yup.ref("password"), null], t("signup_valid.pass_r")),
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
    login: Yup.string().notRequired(),
    passport: Yup.string().notRequired(),
    tag_1: Yup.string().notRequired(),
    country: Yup.string().notRequired(),
    phone: Yup.string().required(t("signup_valid.req")),
    area: Yup.string().notRequired(),
    city: Yup.string().notRequired(),
    address: Yup.string().notRequired(),
    postcode: Yup.string().notRequired(),
  });

  const initialValues = {
    email: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignupSchema,
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
      <main className={`flex-center ${styles.signup}`}>
        <div>
          <img
            src={close}
            alt="close"
            width={16}
            height={16}
            onClick={() => navigate("/signin")}
          />

          <h1>{t("signup.h1")}</h1>
          <p>{t("signup.desc")}</p>

          <FormikProvider value={formik}>
            <form
              onSubmit={(e) => {
                formik.setFieldValue("login", e.target[1].value);
                handleSubmit(e);
              }}
            >
              <div>
                <h2>{t("signup.block_1.h2")}</h2>
                <fieldset>
                  <div>{t("signup.block_1.email")}</div>
                  <CustomInput
                    type="email"
                    name="email"
                    placeholder={t("signup.block_1.email_ph")}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email}
                  />
                </fieldset>
                {touched.email && errors.email && (
                  <div className={styles.error_block}>
                    <div></div>
                    <div>{errors.email}</div>
                  </div>
                )}
                <fieldset>
                  <div>{t("signup.block_1.password")}</div>
                  <CustomInput
                    type="password"
                    name="password"
                    placeholder={t("signup.block_1.password_ph")}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && errors.password}
                  />
                </fieldset>
                {touched.password && errors.password && (
                  <div className={styles.error_block}>
                    <div></div>
                    <div>{errors.password}</div>
                  </div>
                )}
                <fieldset>
                  <div>{t("signup.block_1.password_r")}</div>
                  <CustomInput
                    type="password"
                    name="password_repeat"
                    placeholder={t("signup.block_1.password_r_ph")}
                    value={values.password_repeat}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password_repeat && errors.password_repeat}
                  />
                </fieldset>
                {touched.password_repeat && errors.password_repeat && (
                  <div className={styles.error_block}>
                    <div></div>
                    <div>{errors.password_repeat}</div>
                  </div>
                )}
                <fieldset>
                  <div>{t("signup.block_1.data")}</div>
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
                <h2>{t("signup.block_2.h2")}</h2>
                <fieldset>
                  <div>{t("signup.block_2.second_name")}</div>
                  <CustomInput
                    type="text"
                    name="second_name"
                    placeholder={t("signup.block_2.second_name_ph")}
                    value={values.second_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.second_name && errors.second_name}
                  />
                </fieldset>
                {touched.second_name && errors.second_name && (
                  <div className={styles.error_block}>
                    <div></div>
                    <div>{errors.second_name}</div>
                  </div>
                )}
                <fieldset>
                  <div>{t("signup.block_2.first_name")}</div>
                  <CustomInput
                    type="text"
                    name="first_name"
                    placeholder={t("signup.block_2.first_name_ph")}
                    value={values.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.first_name && errors.first_name}
                  />
                </fieldset>
                {touched.first_name && errors.first_name && (
                  <div className={styles.error_block}>
                    <div></div>
                    <div>{errors.first_name}</div>
                  </div>
                )}
                <fieldset>
                  <div>{t("signup.block_2.patronymic")}</div>
                  <CustomInput
                    type="text"
                    name="patronymic"
                    placeholder={t("signup.block_2.patronymic_ph")}
                    value={values.patronymic}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.patronymic && errors.patronymic}
                  />
                </fieldset>
                <fieldset>
                  <div>{t("signup.block_2.passport")}</div>
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
                  <div>{t("signup.block_2.sex")}</div>
                  <Selector
                    selected={sexSelected || t("signup.block_2.set_empty")}
                  >
                    {Object.entries(sexData)?.map((item) => (
                      <div
                        key={item[0]}
                        onClick={() => {
                          setSexSelected(item[1]);
                          formik.setFieldValue("tag_1", item[0]);
                        }}
                      >
                        {item[1]}
                      </div>
                    ))}
                  </Selector>
                </fieldset>
              </div>

              <div>
                <h2>{t("signup.block_3.h2")}</h2>
                <fieldset>
                  <div>{t("signup.block_3.phone")}</div>
                  <CustomInput
                    type="tel"
                    name="phone"
                    placeholder={t("signup.block_3.phone_ph")}
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && errors.phone}
                  />
                </fieldset>
                {touched.phone && errors.phone && (
                  <div className={styles.error_block}>
                    <div></div>
                    <div>{errors.phone}</div>
                  </div>
                )}
                <fieldset>
                  <div>{t("signup.block_3.country")}</div>
                  <Selector selected={countrySelected}>
                    {countryList
                      ?.filter((item) => item.code !== countrySelected)
                      .map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setCountrySelected(item.name);
                            formik.setFieldValue("country", item.code);
                          }}
                        >
                          {item.name}
                        </div>
                      ))}
                  </Selector>
                </fieldset>
                <fieldset>
                  <div>{t("signup.block_3.area")}</div>
                  <CustomInput
                    type="text"
                    name="area"
                    placeholder={t("signup.block_3.area_ph")}
                    value={values.area}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.area && errors.area}
                  />
                </fieldset>
                <fieldset>
                  <div>{t("signup.block_3.city")}</div>
                  <CustomInput
                    type="text"
                    name="city"
                    placeholder={t("signup.block_3.city_ph")}
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city && errors.city}
                  />
                </fieldset>
                <fieldset>
                  <div>{t("signup.block_3.address")}</div>
                  <CustomInput
                    type="text"
                    name="address"
                    placeholder={t("signup.block_3.address_ph")}
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address && errors.address}
                  />
                </fieldset>
                <fieldset>
                  <div>{t("signup.block_3.postcode")}</div>
                  <CustomInput
                    type="text"
                    name="postcode"
                    placeholder={t("signup.block_3.postcode_ph")}
                    value={values.postcode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.postcode && errors.postcode}
                  />
                </fieldset>
              </div>

              <div className={styles.last_block}>
                <h2 className={styles.last_h2}>{t("signup.block_4.h2")}</h2>
                <div className={`${styles.captcha} flex-center`}>
                  <div className="flex-center">
                    <canvas ref={canvasRef} width={120} height={53.2}></canvas>
                  </div>
                  <img
                    src={reload}
                    alt="reload"
                    width={20}
                    height={20}
                    onClick={drawCaptcha}
                  />
                  <input
                    type="text"
                    maxLength={6}
                    value={userInput}
                    onChange={handleInputChange}
                  />
                </div>
                {showError && !isCaptchaValid && (
                  <div className={styles.error_block}>
                    <div></div>
                    <div>{t("signup.block_4.captcha")}</div>
                  </div>
                )}
                <button
                  disabled={
                    !(dirty && isValid) ||
                    disableBtn ||
                    (!isCaptchaValid && showError) ||
                    userInput.length === 0
                  }
                  type="submit"
                >
                  {t("signup.block_4.btn")}
                </button>
              </div>
            </form>
          </FormikProvider>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SignUp;
