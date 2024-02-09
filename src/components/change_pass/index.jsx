import { FormikProvider, useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import DataCreate from "../data-create";
import LocalStorage from "../../services/localStorage";
import axios from "axios";
import { ErrorContext } from "../error-modal";
import { BigButton } from "../buttons";
import { useTranslation } from "react-i18next";
import CustomInput from "../input";
import styles from "./changepass.module.scss";
import close from "../../assets/images/close.svg";

const ChangePass = ({ show, setShow }) => {
  const [disableBtn, setDisableBtn] = useState(false);
  const { setError, setMessage, setSuccessMessage, setSuccess } =
    useContext(ErrorContext);
  const { t } = useTranslation();

  const changeShow = (e) => {
    if (!e.target.closest(".c_show")) setShow(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (show) {
        document.addEventListener("click", changeShow);
      } else {
        document.removeEventListener("click", changeShow);
      }
    }, 100);

    return () => {
      document.removeEventListener("click", changeShow);
    };
  }, [show]);

  const UpdateSchema = Yup.object().shape({
    old_password: Yup.string()
      .required(t("signup_valid.req"))
      .min(8, t("signup_valid.pass_min")),
    new_password: Yup.string()
      .required(t("signup_valid.req"))
      .min(8, t("signup_valid.pass_min"))
      .matches(/^(?=.*[A-Z])/, t("signup_valid.pass_u"))
      .matches(/(?=.*[a-z])/, t("signup_valid.pass_l"))
      .matches(/(?=.*[0-9])/, t("signup_valid.pass_n")),
    password_repeat: Yup.string()
      .required(t("signup_valid.req"))
      .oneOf([Yup.ref("new_password"), null], t("signup_valid.pass_r")),
  });

  const onHandleSubmit = (value) => {
    setDisableBtn(true);

    const { key, rand_param } = DataCreate();

    var bodyFormData = new FormData();
    bodyFormData.append("key", key);
    bodyFormData.append("rand_param", rand_param);
    bodyFormData.append("user_id", LocalStorage.get("user_id"));
    bodyFormData.append("auth_token", LocalStorage.get("auth_token"));
    Object.entries(value).forEach((element) => {
      bodyFormData.append(element[0], element[1]);
    });

    axios
      .post(
        "https://cabinet.itcyclonelp.com/api/v_2/page/ChangePassword",
        bodyFormData
      )
      .then((e) => {
        if (e.data.result === "success") {
          setShow(false);
          setError(false);
          setSuccess(true);
          setSuccessMessage(t("change_pass.success"));
        } else {
          setError(true);
          setMessage(t("change_pass.error"));
          Object.entries(e.data.errors).forEach((element) => {
            formik.setFieldError(element[0], t("signup_valid.error_any"));
          });
        }
      })
      .finally(() => setDisableBtn(false));
  };

  const formik = useFormik({
    initialValues: {},
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
      {show && (
        <div className={styles.changepass_modal}>
          <FormikProvider value={formik}>
            <form onSubmit={handleSubmit} className="c_show">
              <img
                src={close}
                alt="close"
                width={15}
                height={15}
                onClick={() => setShow(false)}
              />
              <fieldset>
                <div>{t("change_pass.pass1")}</div>
                <CustomInput
                  type="password"
                  name="old_password"
                  placeholder={t("change_pass.pass1_input")}
                  value={values.old_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.old_password && errors.old_password}
                />
              </fieldset>
              {touched.old_password && errors.old_password && (
                <div>
                  <div></div>
                  <div>{errors.old_password}</div>
                </div>
              )}
              <fieldset>
                <div>{t("change_pass.pass2")}</div>
                <CustomInput
                  type="password"
                  name="new_password"
                  placeholder={t("change_pass.pass2_input")}
                  value={values.new_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.new_password && errors.new_password}
                />
              </fieldset>
              {touched.new_password && errors.new_password && (
                <div>
                  <div></div>
                  <div>{errors.new_password}</div>
                </div>
              )}
              <fieldset>
                <div>{t("change_pass.pass3")}</div>
                <CustomInput
                  type="password"
                  name="password_repeat"
                  placeholder={t("change_pass.pass3_input")}
                  value={values.password_repeat}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password_repeat && errors.password_repeat}
                />
              </fieldset>
              {touched.password_repeat && errors.password_repeat && (
                <div>
                  <div></div>
                  <div>{errors.password_repeat}</div>
                </div>
              )}
              <BigButton
                disabled={!(dirty && isValid) || disableBtn}
                type="submit"
              >
                {t("change_pass.btn")}
              </BigButton>
            </form>
          </FormikProvider>
        </div>
      )}
    </>
  );
};

export default ChangePass;
