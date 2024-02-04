import { SmBlueButton, SmGreenButton } from "../../../../components/buttons";
import CusotmInput from "../../../../components/input";
import styles from "./user.module.scss";
import deleteIcon from "../../../../assets/images/servers/delete.svg";

const UserManagement = () => {
  return (
    <>
      <h1 className="h-btn">
        Управление пользователями{" "}
        <SmGreenButton>СОЗДАТЬ ПОЛЬЗОВАТЕЛЯ</SmGreenButton>
      </h1>
      <div className={`table ${styles.user}`}>
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
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ФИО</th>
              <th>Логин</th>
              <th>E-Mail</th>
              <th>Дата регистрации</th>
              <th>Тип</th>
              <th>Город</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1233</td>
              <td className={styles.td_name}>Петров Петя Преторов</td>
              <td className={styles.td_email}>dsfsdlqwkcmw@dke.ru</td>
              <td className={styles.td_email}>dsfsdlqwkcmw@dke.ru</td>
              <td>25.03.2021 09:27</td>
              <td>trader</td>
              <td>Москва</td>
              <td>
                <img src={deleteIcon} alt="delete" width={16} height={16} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserManagement;
