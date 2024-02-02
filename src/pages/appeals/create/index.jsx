import { useState } from "react";
import CustomInput from "../../../components/input";
import Selector from "../../../components/selector";
import sexData from "../../../utils/sex";
import CustomTextArea from "../../../components/textarea";
import styles from "./create.module.scss";
import { BigButton } from "../../../components/buttons";
import { Link } from "react-router-dom";
import download from "../../../assets/images/appeals/download.svg";

const CreateAppeals = () => {
  const [sexKey, setSexKey] = useState();

  return (
    <>
      <h1>Создать обращение</h1>
      <div className={`item-center ${styles.create_appeals}`}>
        <fieldset className="fs-t mb-2">
          <div>Отдел компании</div>
          <Selector data={sexData} selected={sexKey} setSelected={setSexKey} />
        </fieldset>
        <fieldset className="fs-t mb-2">
          <div>Тема обращения</div>
          <CustomInput placeholder="Тема" type="text" />
        </fieldset>
        <fieldset className="fs-t mb-2">
          <div>Текст</div>
          <CustomTextArea placeholder="Введите текст" />
        </fieldset>
        <div className={`item-center mb-2 ${styles.download}`}>
          <img src={download} alt="download" width={20} height={20} />
          <Link>Загрузить файл</Link>
        </div>
        <BigButton>СОЗДАТЬ</BigButton>
      </div>
    </>
  );
};

export default CreateAppeals;
