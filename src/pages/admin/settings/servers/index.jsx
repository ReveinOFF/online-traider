import deleteIcon from "../../../../assets/images/servers/delete.svg";
import { SmGreenButton } from "../../../../components/buttons";

const Servers = () => {
  return (
    <>
      <h1 className="h-btn">
        Серверы <SmGreenButton>СОЗДАТЬ</SmGreenButton>
      </h1>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th></th>
              <th>Тип</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3</td>
              <td>Real</td>
              <td></td>
              <td>UTIP</td>
              <td></td>
              <td></td>
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

export default Servers;
