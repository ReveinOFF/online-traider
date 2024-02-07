import styles from "./signup.module.scss";
import CustomInput from "../../../components/input";
import Footer from "../../../components/footer";
import Selector from "../../../components/selector";
import close from "../../../assets/images/close.svg";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import sexData from "../../../utils/sex";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import axios from "axios";
import DataCreate from "../../../components/data-create";
import LocalStorage from "../../../services/localStorage.js";
import reload from "../../../assets/images/reload.svg";

const SignUp = () => {
  const [typingTimeout, setTypingTimeout] = useState();
  const [countryList, setСountryList] = useState();
  const [countrySelected, setCountrySelected] = useState();
  const [sexSelected, setSexSelected] = useState();
  const [disableBtn, setDisableBtn] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

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
          setIsError(false);
        } else {
          setIsError(true);
          Object.entries(e.data.errors).forEach((element) => {
            formik.setFieldError(element[0], "Error validation");
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
      .email("Invalid email")
      .required("Required")
      .test("checkEmail", "Пошта уже есть", async (value) => {
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
      .required("Required")
      .min(8, "Too Short!")
      .matches(
        /^(?=.*[A-Z])/,
        "Пароль должен содержать как минимум одну заглавную букву"
      )
      .matches(
        /(?=.*[a-z])/,
        "Пароль должен содержать как минимум одну строчную букву"
      )
      .matches(/(?=.*[0-9])/, "Пароль должен содержать как минимум одну цифру"),
    password_repeat: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    date_of_birth: Yup.date()
      .transform(function (value, originalValue) {
        if (this.isType(value)) {
          return value;
        }
        const result = new Date(originalValue);
        return result;
      })
      .notRequired(),
    second_name: Yup.string().required("Required"),
    first_name: Yup.string().required("Required"),
    patronymic: Yup.string().notRequired(),
    login: Yup.string().notRequired(),
    passport: Yup.string().notRequired(),
    tag_1: Yup.string().notRequired(),
    country: Yup.string().notRequired(),
    phone: Yup.string().required("Required"),
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

          <h1>Регистрация</h1>
          <p>
            Регистрация займет всего несколько минут и позволит вам получить
            доступ к личному кабинету. Поля, отмеченные *, обязательны для
            заполнения
          </p>

          <FormikProvider value={formik}>
            <form
              onSubmit={(e) => {
                formik.setFieldValue("login", e.target[1].value);
                handleSubmit(e);
              }}
            >
              <div>
                <h2>Учетная запись</h2>
                <fieldset>
                  <div>E-Mail *</div>
                  <CustomInput
                    type="email"
                    name="email"
                    placeholder="Введите e-mail"
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
                  <div>Пароль *</div>
                  <CustomInput
                    type="password"
                    name="password"
                    placeholder="Введите пароль"
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
                  <div>Повторите новый пароль *</div>
                  <CustomInput
                    type="password"
                    name="password_repeat"
                    placeholder="Повторите пароль"
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
                  <div>Дата рождения</div>
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
                <h2>Учетная запись</h2>
                <fieldset>
                  <div>Фамилия *</div>
                  <CustomInput
                    type="text"
                    name="second_name"
                    placeholder="Введите фамилию"
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
                  <div>Имя *</div>
                  <CustomInput
                    type="text"
                    name="first_name"
                    placeholder="Введите имя"
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
                  <div>Отчество</div>
                  <CustomInput
                    type="text"
                    name="patronymic"
                    placeholder="Введите отчество"
                    value={values.patronymic}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.patronymic && errors.patronymic}
                  />
                </fieldset>
                <fieldset>
                  <div>Паспорт</div>
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
                  <div>Пол</div>
                  <Selector selected={sexSelected || "Не указан"}>
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
                <h2>Контакты</h2>
                <fieldset>
                  <div>Телефон *</div>
                  <CustomInput
                    type="tel"
                    name="phone"
                    placeholder="Введите номер телефона"
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
                  <div>Страна</div>
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
                  <div>Область</div>
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
                  <div>Город</div>
                  <CustomInput
                    type="text"
                    name="city"
                    placeholder="Введите город"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city && errors.city}
                  />
                </fieldset>
                <fieldset>
                  <div>Адрес</div>
                  <CustomInput
                    type="text"
                    name="address"
                    placeholder="Введите адрес"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address && errors.address}
                  />
                </fieldset>
                <fieldset>
                  <div>Почтовый индекс</div>
                  <CustomInput
                    type="text"
                    name="postcode"
                    placeholder="Введите почтовый индекс"
                    value={values.postcode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.postcode && errors.postcode}
                  />
                </fieldset>
              </div>

              <div className={styles.last_block}>
                <h2 className={styles.last_h2}>Контакты</h2>
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
                    <div>Error Captcha</div>
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
                  ЗАРЕГИСТРИРОВАТЬСЯ
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
