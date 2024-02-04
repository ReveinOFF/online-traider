import styles from "./office.module.scss";
import logo from "../../../../assets/images/office/img.svg";
import info from "../../../../assets/images/office/i.svg";
import { BigButton, SmBlueButton } from "../../../../components/buttons";
import CustomInput from "../../../../components/input";
import Checkbox from "../../../../components/checkbox";
import Selector from "../../../../components/selector";
import { useState } from "react";
import sexData from "../../../../utils/sex";
import CustomTextArea from "../../../../components/textarea";

const OfficeAdmin = () => {
  const [sexKey, setSexKey] = useState();

  return (
    <>
      <h1>Личный кабинет</h1>
      <div className={`${styles.mb_5} ${styles.block_data}`}>
        <h2>Настройки</h2>
        <fieldset className={styles.fs}>
          <div>Логотип</div>
          <div className={`flex-center ${styles.logo}`}>
            <img src={logo} alt="logo" width={20} height={20} />
          </div>
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_btn}`}>
          <div>Логотип</div>
          <div>
            <SmBlueButton>Выберите файл</SmBlueButton>
            <div>логотип.png</div>
            <div>
              Файл .png, не более 1 MB Размер логотипа не должен превышать 38x38
              пикселей.
            </div>
          </div>
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_info}`}>
          <div>
            <div>Копирайты</div>
            <img
              src={info}
              alt="info"
              className={styles.info}
              width={16}
              height={16}
            />
          </div>
          <CustomInput type="text" />
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_info}`}>
          <div>
            <div>Максимальное количество счетов 0 - без лимита</div>
            <img
              src={info}
              alt="info"
              className={styles.info}
              width={16}
              height={16}
            />
          </div>
          <CustomInput type="text" />
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_info}`}>
          <div>
            <div>Максимальное количество ордеров</div>
            <img
              src={info}
              alt="info"
              className={styles.info}
              width={16}
              height={16}
            />
          </div>
          <CustomInput type="text" />
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_info}`}>
          <div>
            <div>Выбор валюты</div>
            <img
              src={info}
              alt="info"
              className={styles.info}
              width={16}
              height={16}
            />
          </div>
          <Checkbox />
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_info}`}>
          <div>
            <div>Ограничить время сессии</div>
            <img
              src={info}
              alt="info"
              className={styles.info}
              width={16}
              height={16}
            />
          </div>
          <Checkbox />
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_info}`}>
          <div>
            <div>Название компании</div>
            <img
              src={info}
              alt="info"
              className={styles.info}
              width={16}
              height={16}
            />
          </div>
          <CustomInput type="text" />
        </fieldset>
        <fieldset className={styles.fs}>
          <div>Логотип для писем</div>
          <div className={`flex-center ${styles.logo}`}>
            <img src={logo} alt="logo" width={20} height={20} />
          </div>
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_btn}`}>
          <div>Загрузить логотип для писем</div>
          <div>
            <SmBlueButton>Выберите файл</SmBlueButton>
            <div>логотип.png</div>
            <div>
              Файл .png, не более 1 MB Размер логотипа не должен превышать 38x38
              пикселей.
            </div>
          </div>
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_info}`}>
          <div>
            <div>Генерировать пароль</div>
            <img
              src={info}
              alt="info"
              className={styles.info}
              width={16}
              height={16}
            />
          </div>
          <Checkbox />
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_info}`}>
          <div>
            <div>Подтверждение согласия с каждым документом</div>
            <img
              src={info}
              alt="info"
              className={styles.info}
              width={16}
              height={16}
            />
          </div>
          <Checkbox />
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_info}`}>
          <div>
            <div>Подтверждение согласия с каждым документом</div>
            <img
              src={info}
              alt="info"
              className={styles.info}
              width={16}
              height={16}
            />
          </div>
          <Selector data={sexData} selected={sexKey} setSelected={setSexKey} />
        </fieldset>
        <fieldset className={`${styles.fs_info} ${styles.fs_textarea}`}>
          <div>
            <div>Подтверждение согласия с каждым документом</div>
            <img
              src={info}
              alt="info"
              className={styles.info}
              width={16}
              height={16}
            />
          </div>
          <CustomTextArea />
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_info}`}>
          <div>
            <div>Номер новой заявки</div>
            <img
              src={info}
              alt="info"
              className={styles.info}
              width={16}
              height={16}
            />
          </div>
          <CustomInput type="text" />
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_text}`}>
          <div>Версия личного кабинета</div>
          <div>2.11.11.2</div>
        </fieldset>
      </div>
      <div className={styles.block_data}>
        <h2>Настройки Trader's Room</h2>
        <fieldset className={styles.fs_block}>
          <div>Загрузить баннер</div>
          <div>
            <div className="btn_z-index">
              <SmBlueButton className={styles.btn_bg}>
                Выберите файл
              </SmBlueButton>
              <div>файл не выбран</div>
            </div>
            <div>
              Поддерживаемый тип файлов: jpg, jpeg, png, gif, svg. Размер
              баннера не должен превышать 890x156 пикселей.
            </div>
          </div>
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_info}`}>
          <div>
            <div>Ссылка для баннера</div>
            <img
              src={info}
              alt="info"
              className={styles.info}
              width={16}
              height={16}
            />
          </div>
          <CustomInput type="text" placeholder="Введите ссылку" />
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_info}`}>
          <div>
            <div>Сайт компании</div>
            <img
              src={info}
              alt="info"
              className={styles.info}
              width={16}
              height={16}
            />
          </div>
          <CustomInput type="text" placeholder="Введите ссылку" />
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_info}`}>
          <div>
            <div>Название сайта компании</div>
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
            <div>Переход в терминал</div>
            <img
              src={info}
              alt="info"
              className={styles.info}
              width={16}
              height={16}
            />
          </div>
          <CustomInput type="text" placeholder="Введите ссылку" />
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_info}`}>
          <div>
            <div>Личный менеджер</div>
            <img
              src={info}
              alt="info"
              className={styles.info}
              width={16}
              height={16}
            />
          </div>
          <Selector data={sexData} selected={sexKey} setSelected={setSexKey} />
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_btn}`}>
          <div>Загрузить аватар</div>
          <div>
            <SmBlueButton>Выберите файл</SmBlueButton>
            <div>аватар.png</div>
            <div>
              Файл .png, не более 2 MB. Размер аватара не должен превышать 64x64
              пикселей.
            </div>
          </div>
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_info}`}>
          <div>
            <div>Имя</div>
            <img
              src={info}
              alt="info"
              className={styles.info}
              width={16}
              height={16}
            />
          </div>
          <CustomInput type="text" />
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_info}`}>
          <div>
            <div>Фамилия</div>
            <img
              src={info}
              alt="info"
              className={styles.info}
              width={16}
              height={16}
            />
          </div>
          <CustomInput type="text" />
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_info}`}>
          <div>
            <div>Должность</div>
            <img
              src={info}
              alt="info"
              className={styles.info}
              width={16}
              height={16}
            />
          </div>
          <CustomInput type="text" />
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_info}`}>
          <div>
            <div>E-mail</div>
            <img
              src={info}
              alt="info"
              className={styles.info}
              width={16}
              height={16}
            />
          </div>
          <CustomInput type="email" />
        </fieldset>
        <fieldset className={`${styles.fs} ${styles.fs_info}`}>
          <div>
            <div>Номер телефона</div>
            <img
              src={info}
              alt="info"
              className={styles.info}
              width={16}
              height={16}
            />
          </div>
          <CustomInput type="tel" pattern="+[0-9]*" />
        </fieldset>
      </div>
      <div className={`justify-center ${styles.btn}`}>
        <BigButton>СОХРАНИТЬ</BigButton>
      </div>
    </>
  );
};

export default OfficeAdmin;
