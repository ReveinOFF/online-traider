import { useState } from "react";
import CustomInput from "../../../../components/input";
import Selector from "../../../../components/selector";
import CustomTextArea from "../../../../components/textarea";
import sexData from "../../../../utils/sex";
import styles from "./templates.module.scss";
import { BigButton, SmBlueButton } from "../../../../components/buttons";

const Templates = () => {
  const [sexKey, setSexKey] = useState();

  return (
    <>
      <h1>Шаблоны писем</h1>
      <h2>Настройки шаблона</h2>
      <div className={styles.block}>
        <fieldset className="fs-t">
          <div>Шаблон</div>
          <Selector data={sexData} selected={sexKey} setSelected={setSexKey} />
        </fieldset>
        <fieldset className="fs-t">
          <div>Язык</div>
          <Selector data={sexData} selected={sexKey} setSelected={setSexKey} />
        </fieldset>
        <fieldset className="fs-t">
          <div>Тема</div>
          <CustomInput type="text" />
        </fieldset>
        <fieldset className="fs-t">
          <div>Текст</div>
          <CustomTextArea />
        </fieldset>
        <div>
          <SmBlueButton>ТЕСТ</SmBlueButton>
          <BigButton>СОЗДАТЬ</BigButton>
        </div>
      </div>
    </>
  );
};

export default Templates;
