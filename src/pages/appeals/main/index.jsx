import styles from "./main.module.scss";
import CusotmInput from "../../../components/input";
import { SmBlueButton, SmGreenButton } from "../../../components/buttons";

const MainAppeals = () => {
  return (
    <>
      <h1>Обращения</h1>
      <div className={styles.main_appeals}>
        <div className="justify-center mb-3">
          <SmGreenButton className={styles.t_btn}>
            СОЗДАТЬ ОБРАЩЕНИЕ
          </SmGreenButton>
          <SmBlueButton className={styles.t_btn}>АРХИВ ОБРАЩЕНИЙ</SmBlueButton>
        </div>
        <div>
          <fieldset className="fs-t">
            <div>Начало</div>
            <CusotmInput type="date" />
          </fieldset>
          <fieldset className="fs-t">
            <div>Конец</div>
            <CusotmInput type="text" />
          </fieldset>
          <fieldset className="fs-t">
            <div>Ключевое слово</div>
            <CusotmInput type="text" placeholder="Введите слово" />
          </fieldset>
          <SmBlueButton className={styles.btn}>ПОИСК</SmBlueButton>
        </div>
        <div>
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
      </div>
    </>
  );
};

export default MainAppeals;
