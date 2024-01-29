import { Link } from "react-router-dom";
import "./header.style.scss";
import arrow from "../../assets/images/arrow.svg";
import arrow_first from "../../assets/images/arrow_first.svg";
import russian from "../../assets/images/header/russian.png";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li className="justify-center roboto">
            <button className="item-center">
              ТОРГОВЛЯ{" "}
              <img src={arrow_first} alt="arrow" width={10} height={10} />
            </button>
            <div className="h_dropdown">
              <Link>Мои счета</Link>
              <Link>Открыть счет</Link>
              <Link>Подключить счет</Link>
              <Link>Депозитные операции</Link>
              <Link>Торговая история</Link>
            </div>
          </li>
          <li className="justify-center roboto">
            <button className="item-center">
              ПЛАТЕЖИ <img src={arrow} alt="arrow" width={10} height={10} />
            </button>
          </li>
          <li className="justify-center roboto">
            <button className="item-center">
              КОМПАНИЯ <img src={arrow} alt="arrow" width={10} height={10} />
            </button>
          </li>
          <li className="justify-center roboto">
            <Link to="">ОБРАЩЕНИЕ</Link>
          </li>
        </ul>
      </nav>
      <div>
        <button>WebTerminal</button>
        <div className="profile">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.162 12.03L10.608 11.3913L10.3907 10.522C11.074 9.84534 11.542 8.916 11.6807 7.96266C12.0593 7.856 12.3527 7.53131 12.4033 7.124L12.57 5.79066C12.6053 5.50931 12.5186 5.22466 12.332 5.01131C12.2226 4.88597 12.0846 4.79131 11.932 4.73331L11.9933 3.47797L12.2427 3.22797C12.618 2.82862 12.9293 2.14397 12.2787 1.15062C11.7787 0.387344 10.9293 0 9.75334 0C9.28934 0 8.22134 0 7.22669 0.668C4.38666 0.727344 4 2.04666 4 3.33334C4 3.63269 4.07266 4.30669 4.12066 4.71334C3.94931 4.76734 3.794 4.86734 3.67266 5.00534C3.48266 5.22069 3.39466 5.50669 3.43 5.79134L3.59666 7.12469C3.65131 7.55934 3.98131 7.90134 4.39866 7.98269C4.53666 8.89934 4.98066 9.79869 5.62466 10.464L5.39266 11.3927L2.83866 12.0313C1.16666 12.448 0 13.9427 0 15.6667C0 15.8507 0.149344 16 0.333344 16H15.6667C15.8507 16 16 15.8493 16 15.6653C16 13.9427 14.8333 12.448 13.162 12.03Z"
              fill="#6B6E7B"
            />
          </svg>
          Мой профиль
        </div>
        <div className="lng">
          <img src={russian} alt="russian" width={16} height={16} />
        </div>
      </div>
    </header>
  );
};

export default Header;
