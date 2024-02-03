import deleteIcon from "../../../../assets/images/servers/delete.svg";
import { SmGreenButton } from "../../../../components/buttons";

const DocumentsAdmin = () => {
  return (
    <>
      <h1 className="h-btn">
        Документы <SmGreenButton>СОЗДАТЬ ДОКУМЕНТ</SmGreenButton>
      </h1>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Номер</th>
              <th className="th-t-left">Название</th>
              <th>Дата создания</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td className="td-t-left">Тут будет название документа</td>
              <td>18.04.2021 16:16</td>
              <td></td>
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

export default DocumentsAdmin;
