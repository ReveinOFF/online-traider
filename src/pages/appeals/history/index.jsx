import styles from "./history.module.scss";
import CustomTextArea from "../../../components/textarea";
import { BigButton, SmBlueButton } from "../../../components/buttons";
import { useSearchParams } from "react-router-dom";
import download from "../../../assets/images/appeals/download.svg";
import Checkbox from "../../../components/checkbox";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataCreate from "../../../components/data-create";
import deleteIcon from "../../../assets/images/servers/delete.svg";
import axios from "axios";
import { ErrorContext } from "../../../components/error-modal";
import LocalStorage from "../../../services/localStorage";

const HistoryAppeals = () => {
  const { t } = useTranslation();
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState();
  const [files, setFiles] = useState([]);
  const [filesPreview, setFilesPreview] = useState([]);
  const ref = useRef();
  const [close, setClose] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const { setError, setMessage, setSuccessMessage, setSuccess } =
    useContext(ErrorContext);
  const [searchParams] = useSearchParams();

  const value = useMemo(() => {
    const { key, rand_param } = DataCreate();

    return { key, rand_param };
  }, []);

  const getRequests = () => {
    const { key, rand_param } = DataCreate();

    axios
      .get("https://cabinet.itcyclonelp.com/api/v_2/partner/ViewRequest", {
        params: {
          key,
          rand_param,
          auth_token: LocalStorage.get("auth_token"),
          user_id: LocalStorage.get("user_id"),
          ticket_id: searchParams.get("id"),
        },
      })
      .then((e) => {
        if (e.data.result === "success") {
          setMessages(e.data.values);
          setError(false);
        } else {
          setError(true);
          setMessage(t("profile.error"));
        }
      });
  };

  useEffect(() => {
    getRequests();
  }, []);

  const handleClick = async () => {
    setDisabledBtn(true);

    const { key, rand_param } = DataCreate();

    var bodyFormData = new FormData();
    bodyFormData.append("key", key);
    bodyFormData.append("rand_param", rand_param);
    bodyFormData.append("auth_token", LocalStorage.get("auth_token"));
    bodyFormData.append("user_id", LocalStorage.get("user_id"));
    bodyFormData.append("ticket_id", searchParams.get("id"));
    bodyFormData.append("text", text);

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
        "https://cabinet.itcyclonelp.com/api/v_2/partner/SendMessageToRequest",
        bodyFormData
      )
      .then((e) => {
        if (e.data.result === "success") {
          setError(false);
        } else {
          setError(true);
          setMessage(t("app_mess.err"));
        }
      });

    if (close) {
      var bodyFormData3 = new FormData();
      bodyFormData3.append("key", key);
      bodyFormData3.append("rand_param", rand_param);
      bodyFormData3.append("auth_token", LocalStorage.get("auth_token"));
      bodyFormData3.append("user_id", LocalStorage.get("user_id"));
      bodyFormData3.append("ticket_id", searchParams.get("id"));

      await axios
        .post(
          "https://cabinet.itcyclonelp.com/api/v_2/partner/CloseRequest",
          bodyFormData3
        )
        .then((e) => {
          if (e.data.result === "success") {
            setIsClosed(true);
            setError(false);
          } else {
            setError(true);
            setMessage(t("app_mess.err"));
          }
        });
    }

    setDisabledBtn(false);
    setSuccess(true);
    setSuccessMessage(t("app_mess.succ"));
    getRequests();
    setText("");
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
  };

  const handleReopen = async () => {
    const { key, rand_param } = DataCreate();

    var bodyFormData = new FormData();
    bodyFormData.append("key", key);
    bodyFormData.append("rand_param", rand_param);
    bodyFormData.append("auth_token", LocalStorage.get("auth_token"));
    bodyFormData.append("user_id", LocalStorage.get("user_id"));
    bodyFormData.append("ticket_id", searchParams.get("id"));

    await axios
      .post(
        "https://cabinet.itcyclonelp.com/api/v_2/partner/ReopenRequest",
        bodyFormData
      )
      .then((e) => {
        if (e.data.result === "success") {
          setIsClosed(false);
        }
      });

    getRequests();
  };

  return (
    <>
      <h1>{t("app_mess.h1")}</h1>
      <div className={styles.history_appeals}>
        <div className="mb-2">
          <div className={styles.header_apples}>
            <div>
              {t("app_mess.sub")} {messages?.request_subject}
            </div>
            <div>{t("app_mess.depart")}</div>
          </div>
          <div className={styles.body_apples}>
            {Object.values(messages)
              ?.filter(
                (value) =>
                  typeof value === "object" &&
                  value !== null &&
                  value.status === "0"
              )
              .reverse()
              .map((item) => (
                <div key={item?.id}>
                  <div className={styles.info}>
                    <div>{item?.user_first_name}</div>
                    <div>
                      {new Date(item?.date * 1000)
                        ?.toLocaleString("ru", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                        .replace(",", "")}
                    </div>
                  </div>
                  <div className={styles.status}>
                    {t("app_mess.status")} {item?.role_name}
                  </div>
                  <div className={styles.message}>{item?.text}</div>
                  <div className={styles.files}>
                    {item?.files?.map((file) => (
                      <div>
                        <img
                          src={`https://cabinet.itcyclonelp.com/api/v_2/page/GetUpload?key=${
                            value.key
                          }&rand_param=${
                            value.rand_param
                          }&auth_token=${LocalStorage.get(
                            "auth_token"
                          )}&fileID=${file.file_id}`}
                          alt="file"
                          width={94}
                          height={94}
                          onClick={() =>
                            window.open(
                              `https://cabinet.itcyclonelp.com/api/v_2/page/GetUpload?key=${
                                value.key
                              }&rand_param=${
                                value.rand_param
                              }&auth_token=${LocalStorage.get(
                                "auth_token"
                              )}&fileID=${file.file_id}`,
                              "_blank"
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
        {messages?.in_archive || isClosed ? (
          <div className={styles.closed}>
            <div>{t("app_mess.is_close")}</div>
            <SmBlueButton onClick={handleReopen}>
              {t("app_mess.reopen")}
            </SmBlueButton>
          </div>
        ) : (
          <>
            <fieldset className={`fs-t mb-2 ${styles.input}`}>
              <div>{t("app_mess.text")}</div>
              <CustomTextArea
                placeholder={t("app_mess.text_ph")}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </fieldset>
            <div>
              <div
                className={`item-center ${styles.download}`}
                onClick={() => ref.current.click()}
              >
                <img src={download} alt="download" width={20} height={20} />
                <div>{t("app_mess.upload")}</div>
              </div>
              <input
                type="file"
                style={{ display: "none" }}
                ref={ref}
                multiple
                onChange={changeFiles}
              />
              <div className={styles.img_preview}>
                {filesPreview?.map((item, index) => (
                  <div key={index}>
                    <button
                      className="flex-center"
                      onClick={() => deleteFile(index)}
                    >
                      <img
                        src={deleteIcon}
                        alt="delete"
                        width={15}
                        height={15}
                      />
                    </button>
                    <img src={item} alt="file" width={90} height={90} />
                  </div>
                ))}
              </div>
              <div className={`item-center mb-2 ${styles.check}`}>
                <Checkbox checked={close} setChecked={setClose} />
                <div>{t("app_mess.close")}</div>
              </div>
              <BigButton
                className="mb-3"
                disabled={disabledBtn || !text}
                onClick={handleClick}
              >
                {t("app_mess.btn")}
              </BigButton>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HistoryAppeals;
