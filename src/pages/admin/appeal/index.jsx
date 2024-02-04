import { SmGreenButton, SmBlueButton } from "../../../components/buttons";
import CustomInput from "../../../components/input";
import styles from "./appeal.module.scss";

const AppealAdmin = () => {
  return (
    <>
      <h1 className="h-btn">
        Обращения <SmGreenButton>АРХИВ ОБРАЩЕНИЙ</SmGreenButton>
      </h1>
      <div className="table">
        <div className={`mb-2 justify-center ${styles.top_title}`}>
          <div>ТРЕЙДЕРЫ</div>
        </div>
        <div className={`mb-3 ${styles.block_input}`}>
          <fieldset className="fs-t">
            <div>Начало</div>
            <CustomInput type="date" />
          </fieldset>
          <fieldset className="fs-t">
            <div>Конец</div>
            <CustomInput type="text" />
          </fieldset>
          <fieldset className="fs-t">
            <div>Ключевое слово</div>
            <CustomInput type="text" placeholder="Введите слово" />
          </fieldset>
          <SmBlueButton>ПОИСК</SmBlueButton>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Тема обращения</th>
              <th>Отдел камуникации</th>
              <th>Дата создания</th>
              <th>Последнее сообщение</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colSpan={6}>Нет результатов</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default AppealAdmin;
