import deleteIcon from "../../../../assets/images/servers/delete.svg";
import { SmBlueButton, SmGreenButton } from "../../../../components/buttons";

const Account = () => {
  return (
    <>
      <h1 className="h-s-btn">
        Типы счетов
        <div>
          <SmGreenButton>СОЗДАТЬ</SmGreenButton>
          <SmBlueButton>ПОДКЛЮЧИТЬ</SmBlueButton>
        </div>
      </h1>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Сервер</th>
              <th>Счета/Архив</th>
              <th>Тип группы</th>
              <th>Валюта</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ID</td>
              <td>Название</td>
              <td>Сервер</td>
              <td>Счета/Архив</td>
              <td>Тип группы</td>
              <td>Валюта</td>
              <td></td>
              <td className={`item-center delete`}>
                <img src={deleteIcon} alt="delete" width={16} height={16} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Account;
