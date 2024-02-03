import { SmBlueButton, SmGreenButton } from "../../../../components/buttons";

const LangAdmin = () => {
  return (
    <>
      <h1 className="h-s-btn">
        Типы счетов{" "}
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
              <th className="th-t-left">Название</th>
              <th>Идентификатор языка</th>
              <th>Активность</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td className="td-t-left">English</td>
              <td>en</td>
              <td className="td-active">Активен</td>
            </tr>
            <tr>
              <td>1</td>
              <td className="td-t-left">English</td>
              <td>en</td>
              <td className="td-inactive">Неактивен</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LangAdmin;
