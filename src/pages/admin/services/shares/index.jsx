import { SmGreenButton } from "../../../../components/buttons";
import deleteIcon from "../../../../assets/images/servers/delete.svg";
import styles from "./shares.module.scss";

const Shares = () => {
  return (
    <>
      <h1 className="h-btn">
        Акции <SmGreenButton>СОЗДАТЬ</SmGreenButton>
      </h1>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Изображение</th>
              <th>Название</th>
              <th>Описание</th>
              <th>Дата создания</th>
              <th>Дата закрытия</th>
              <th>Активность</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td></td>
              <td className={styles.td_name}>Фьючерс 2019 года</td>
              <td>Пополняйте счет по старому курсу!</td>
              <td>20.04.2020</td>
              <td>30.04.2020</td>
              <td>Not active</td>
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

export default Shares;
