import CustomInput from "../../../components/input";
import CustomTextArea from "../../../components/textarea";
import styles from "./create.module.scss";
import { BigButton } from "../../../components/buttons";
import download from "../../../assets/images/appeals/download.svg";
import { useContext, useRef, useState } from "react";
import { ErrorContext } from "../../../components/error-modal";
import deleteIcon from "../../../assets/images/servers/delete.svg";
import axios from "axios";
import DataCreate from "../../../utils/data-create";
import LocalStorage from "../../../services/localStorage";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CreateAppeals = () => {
  const [disableBtn, setDisableBtn] = useState(false);
  const [subject, setSubject] = useState();
  const [message, setMessages] = useState();
  const [files, setFiles] = useState([]);
  const [filesPreview, setFilesPreview] = useState([]);
  const ref = useRef();
  const { setError, setMessage } = useContext(ErrorContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = async () => {
    setDisableBtn(true);

    const { key, rand_param } = DataCreate();

    var bodyFormData = new FormData();
    bodyFormData.append("key", key);
    bodyFormData.append("rand_param", rand_param);
    bodyFormData.append("auth_token", LocalStorage.get("auth_token"));
    bodyFormData.append("user_id", LocalStorage.get("user_id"));
    bodyFormData.append("department", 1);
    bodyFormData.append("subject", subject);
    bodyFormData.append("text", message);

    if (files.length > 0) {
      var bodyFormData2 = new FormData();
      bodyFormData2.append("key", key);
      bodyFormData2.append("rand_param", rand_param);
      bodyFormData2.append("auth_token", LocalStorage.get("auth_token"));
      bodyFormData2.append("user_id", LocalStorage.get("user_id"));
      bodyFormData2.append("type_file", 1);
      files.forEach((item, index) => {
        bodyFormData2.append(`files[${index}]`, item);
      });

      await axios
        .post(
          "https://cabinet.itcyclonelp.com/api/v_2/page/UploadFiles",
          bodyFormData2
        )
        .then((e) => {
          let array = [];
          if (e.data.result === "success") {
            Object.entries(e.data.values.file).forEach(([key, value]) =>
              array.push(value.id.toString())
            );
          }
          bodyFormData.append("files", JSON.stringify(array));
        });
    }

    await axios
      .post(
        "https://cabinet.itcyclonelp.com/api/v_2/partner/CreateRequest",
        bodyFormData
      )
      .then((e) => {
        if (e.data.result === "success") {
          navigate(`/appeals/tickets?id=${e.data.values.ticked_id}`);
          setError(false);
        } else {
          setError(true);
          setMessage(t("app_create.err"));
        }
      })
      .finally(() => setDisableBtn(false));
  };

  const changeFiles = (e) => {
    if (files.length >= 8) {
      setError(true);
      setMessage(t("app_create.err_f1"));
      e.preventDefault();
      return;
    }

    if (e.target.files.length + files.length > 8) {
      setError(true);
      setMessage(t("app_create.err_f2"));
      e.preventDefault();
      return;
    }

    const urls = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setFiles((prev) => [...prev, ...e.target.files]);
    setFilesPreview((prev) => [...prev, ...urls]);
  };

  const deleteFile = (idx) => {
    setFilesPreview(filesPreview.filter((_, index) => index !== idx));
    setFiles(files.filter((_, index) => index !== idx));
  };

  return (
    <>
      <h1>{t("app_create.h1")}</h1>
      <div className={`item-center ${styles.create_appeals}`}>
        <fieldset className="fs-t mb-2">
          <div>{t("app_create.sub")}</div>
          <CustomInput
            placeholder={t("app_create.sub_ph")}
            type="text"
            onChange={(e) => setSubject(e.target.value)}
          />
        </fieldset>
        <fieldset className="fs-t mb-2">
          <div>{t("app_create.text")}</div>
          <CustomTextArea
            placeholder={t("app_create.text_ph")}
            onChange={(e) => setMessages(e.target.value)}
          />
        </fieldset>
        <div
          className={`item-center ${styles.download}`}
          onClick={() => ref.current.click()}
        >
          <img src={download} alt="download" width={20} height={20} />
          <div>{t("app_create.upload")}</div>
        </div>
        <input
          type="file"
          ref={ref}
          multiple
          accept=".jpg, .jpeg, .png"
          style={{ display: "none" }}
          onChange={changeFiles}
        />
        <div className={styles.img_preview}>
          {filesPreview?.map((item, index) => (
            <div key={index}>
              <button className="flex-center" onClick={() => deleteFile(index)}>
                <img src={deleteIcon} alt="delete" width={15} height={15} />
              </button>
              <img src={item} alt="file" width={100} height={100} />
            </div>
          ))}
        </div>
        <BigButton
          onClick={handleClick}
          disabled={!subject || !message || disableBtn}
        >
          {t("app_create.btn")}
        </BigButton>
      </div>
    </>
  );
};

export default CreateAppeals;
