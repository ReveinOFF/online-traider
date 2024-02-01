import { Link } from "react-router-dom";
import styles from "./documents.module.scss";

const DocumentsAccount = () => {
  return (
    <>
      <h1>Ввод средств</h1>
      <div className={styles.documents}>
        <table>
          <thead>
            <tr>
              <th>Название</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div>
                  <div>Тут будет название документа</div>
                  <div>
                    <Link>Просмотр</Link>
                    <Link>PDF формат</Link>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DocumentsAccount;
