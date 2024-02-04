import CustomInput from "../../../../components/input";
import CustomTextArea from "../../../../components/textarea";
import Selector from "../../../../components/selector";
import { BigButton } from "../../../../components/buttons";
import styles from "./email.module.scss";
import { useState } from "react";
import sexData from "../../../../utils/sex";
import download from "../../../../assets/images/appeals/download.svg";
import { Link } from "react-router-dom";

const EmailList = () => {
  const [sexKey, setSexKey] = useState();

  return (
    <>
      <h1>E-Mail рассылка</h1>
      <div className={styles.block}>
        <fieldset className="fs-t">
          <div>Группа в ЛК</div>
          <Selector data={sexData} selected={sexKey} setSelected={setSexKey} />
        </fieldset>
        <fieldset className="fs-t">
          <div>Заголовок</div>
          <CustomInput type="text" placeholder="Введите заголовок" />
        </fieldset>
        <fieldset className="fs-t">
          <div>Текст</div>
          <CustomTextArea placeholder="Введите текст" />
        </fieldset>
        <div className={`item-center mb-2 ${styles.download}`}>
          <img src={download} alt="download" width={20} height={20} />
          <Link>Загрузить файл</Link>
        </div>
        <BigButton>ОТПРАВИТЬ</BigButton>
      </div>
      <div></div>
    </>
  );
};

export default EmailList;
