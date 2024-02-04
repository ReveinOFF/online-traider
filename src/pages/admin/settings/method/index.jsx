import { useState } from "react";
import sexData from "../../../../utils/sex";
import styles from "./method.module.scss";
import Selector from "../../../../components/selector";
import CustomInput from "../../../../components/input";
import info from "../../../../assets/images/office/i.svg";
import deleteIcon from "../../../../assets/images/servers/delete.svg";
import {
  BigButton,
  SmBlueButton,
  SmGreenButton,
} from "../../../../components/buttons";

const MethodAdmin = () => {
  const [sexKey, setSexKey] = useState();

  return (
    <>
      <h1>Методы оплаты</h1>
      <div className={styles.method}>
        <div className={`mb-2 justify-center ${styles.top_title}`}>
          <div>ПОПЛЕНИЕ СЧЕТА</div>
          <div>ПОПЛЕНИЕ СЧЕТА</div>
        </div>
        <div className="justify-center mb-3">
          <fieldset className={`fs-t ${styles.fs_center}`}>
            <div>Язык</div>
            <Selector
              data={sexData}
              selected={sexKey}
              setSelected={setSexKey}
            />
          </fieldset>
        </div>
        <div className={`mb-2 ${styles.block_data}`}>
          <h2>Группа платежей</h2>
          <fieldset
            className={`${styles.fs} ${styles.fs_info} ${styles.fs_delete}`}
          >
            <div>
              <div>Название группы</div>
              <img
                src={info}
                alt="info"
                className={styles.info}
                width={16}
                height={16}
              />
            </div>
            <CustomInput type="text" placeholder="Введите название" />
            <img src={deleteIcon} alt="delete" width={16} height={16} />
          </fieldset>
        </div>
        <div className={styles.block_data2}>
          <div className={styles.block_bg}></div>
          <div>
            <fieldset className={`${styles.fs} ${styles.fs_info}`}>
              <div>
                <div>Метод оплаты</div>
                <img
                  src={info}
                  alt="info"
                  className={styles.info}
                  width={16}
                  height={16}
                />
              </div>
              <CustomInput type="text" placeholder="Введите название" />
            </fieldset>
            <fieldset className={`${styles.fs} ${styles.fs_info}`}>
              <div>
                <div>Описание метода</div>
                <img
                  src={info}
                  alt="info"
                  className={styles.info}
                  width={16}
                  height={16}
                />
              </div>
              <CustomInput type="text" placeholder="Введите описание" />
            </fieldset>
            <fieldset
              className={`${styles.fs} ${styles.fs_info}  ${styles.fs_btn}`}
            >
              <div>
                <div>Платежная система</div>
                <img
                  src={info}
                  alt="info"
                  className={styles.info}
                  width={16}
                  height={16}
                />
              </div>
              <SmBlueButton>Выберите метод</SmBlueButton>
            </fieldset>
            <fieldset className={styles.fs_block}>
              <div>Загрузить логотип</div>
              <div>
                <div>
                  <SmBlueButton className={styles.btn_bg}>
                    Выберите файл
                  </SmBlueButton>
                  <div>файл не выбран</div>
                </div>
                <div>
                  Поддерживаемый тип файлов: png. Файл не должен превышать 10
                  MB. Размер логотипа не должен превышать 124x32 пикселя.
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div className={styles.btn_add}>
          <SmBlueButton>ДОБАВИТЬ</SmBlueButton>
        </div>
        <div className={styles.border}></div>
        <div className={styles.btn_add}>
          <SmGreenButton>НОВАЯ ГРУППА</SmGreenButton>
        </div>
        <div className={styles.bottom_btn}>
          <SmBlueButton disabled className={styles.btn_abolition}>
            СОХРАНИТЬ
          </SmBlueButton>
          <BigButton disabled>СОХРАНИТЬ</BigButton>
        </div>
      </div>
    </>
  );
};

export default MethodAdmin;
