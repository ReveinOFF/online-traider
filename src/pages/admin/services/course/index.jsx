import CustomInput from "../../../../components/input";
import styles from "./course.module.scss";

const Course = () => {
  return (
    <>
      <h1 className={styles.mb_1}>Курсы валют</h1>
      <p className="mb-2">Курсы с бирж применяются только для криптовалют</p>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Конвертация из (валюта)</th>
              <th>Конвертация в (валюта)</th>
              <th>Курс ЦБ/ бирж</th>
              <th>Свой курс</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>EUR</td>
              <td>BCH</td>
              <td>
                <div>BCH/EUR: 239.24691</div>
                <div>Больше курс - больше зачисление</div>
              </td>
              <td className={styles.table_input}>
                <CustomInput type="number" placeholder="Введите курс" />
              </td>
            </tr>
            <tr className={styles.table_bottom}>
              <td colSpan={4}>
                <div>
                  <div className={styles.left_bottom}>
                    <div>Показать по:</div>
                    <div>
                      <div className={styles.active}>25</div>
                      <div>50</div>
                      <div>100</div>
                    </div>
                    <div>Всего: 108</div>
                  </div>

                  <div className={styles.right_bottom}>
                    <div className={styles.active}>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
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

export default Course;
