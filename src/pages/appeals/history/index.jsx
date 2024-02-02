import styles from "./history.module.scss";
import CustomTextArea from "../../../components/textarea";
import { BigButton } from "../../../components/buttons";
import { Link } from "react-router-dom";
import download from "../../../assets/images/appeals/download.svg";
import Checkbox from "../../../components/checkbox";

const HistoryAppeals = () => {
  return (
    <>
      <h1>История сообщений</h1>
      <div className={styles.history_appeals}>
        <div className="mb-2">
          <div className={styles.header_apples}>
            <div>Тема обращения: sfs</div>
            <div>Отдел компании: Отдел по работе с клиентами</div>
          </div>
          <div className={styles.body_apples}>
            <div>
              <div className={styles.info}>
                <div>Иван Иванов</div>
                <div>07.05.2021 11:46</div>
              </div>
              <div className={styles.status}>Статус: trader</div>
              <div className={styles.message}>
                Как уже неоднократно упомянуто, базовые сценарии поведения
                пользователей, которые представляют собой яркий пример
                континентально-европейского типа политической культуры, будут
                преданы социально-демократической анафеме.
              </div>
            </div>
            <div>
              <div className={styles.info}>
                <div>Иван Иванов</div>
                <div>07.05.2021 11:46</div>
              </div>
              <div className={styles.status}>Статус: trader</div>
              <div className={styles.message}>
                Как уже неоднократно упомянуто, базовые сценарии поведения
                пользователей, которые представляют собой яркий пример
                континентально-европейского типа политической культуры, будут
                преданы социально-демократической анафеме.
              </div>
            </div>
          </div>
        </div>
        <fieldset className={`fs-t mb-2 ${styles.input}`}>
          <div>Введите ответ</div>
          <CustomTextArea placeholder="Введите текст" />
        </fieldset>
        <div>
          <div className={`item-center mb-2 ${styles.download}`}>
            <img src={download} alt="download" width={20} height={20} />
            <Link>Загрузить файл</Link>
          </div>
          <div className={`item-center mb-2 ${styles.check}`}>
            <Checkbox />
            <div>Закрыть обращение</div>
          </div>
          <BigButton className="mb-3">СОЗДАТЬ</BigButton>
        </div>
      </div>
    </>
  );
};

export default HistoryAppeals;
