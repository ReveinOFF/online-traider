import style from "./check.module.scss";
import print from "../../../assets/images/payments/print.svg";

const Check = () => {
  return (
    <>
      <div className={`mt-3 item-center ${style.check}`}>
        <div className="check_info mb-1">
          <div>Номер заявки</div>
          <div>3645</div>
        </div>
        <div className="check_info mb-1">
          <div>Валюта</div>
          <div>USD</div>
        </div>
        <div className="check_info mb-1">
          <div>Сумма платежа</div>
          <div>232.00</div>
        </div>
        <div className="check_info mb-2">
          <div>Реквизиты</div>
          <div>Недоступно в вашем регионе</div>
        </div>
        <div className={style.print}>
          <img src={print} alt="print" width={20} height={20} />
          <div>Версия для печати</div>
        </div>
      </div>
    </>
  );
};

export default Check;
