import { Link } from "react-router-dom";
import "./header.style.scss";
import arrow from "../../assets/images/arrow.svg";
import arrow_first from "../../assets/images/arrow_first.svg";
import Language from "../language";
import { NmGreenButton } from "../buttons";
import profile from "../../assets/images/header/profile.svg";
import { useEffect, useState } from "react";
import myprofile from "../../assets/images/header/myprofile.svg";
import exit from "../../assets/images/header/exit.svg";

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showShop, setShowShop] = useState(false);

  const changeShowProfile = (e) => {
    if (!e.target.closest(".c_profile")) setShowProfile(false);
  };

  useEffect(() => {
    if (showProfile) {
      document.addEventListener("click", changeShowProfile);
    } else {
      document.removeEventListener("click", changeShowProfile);
    }

    return () => {
      document.removeEventListener("click", changeShowProfile);
    };
  }, [showProfile]);

  return (
    <header>
      <nav>
        <ul>
          <li className="justify-center">
            <button
              className="item-center"
              onClick={() => setShowShop(!showShop)}
            >
              ТОРГОВЛЯ{" "}
              <img
                src={arrow_first}
                className={showShop ? "active" : ""}
                alt="arrow"
                width={10}
                height={10}
              />
            </button>
            <div className={`h_dropdown ${showShop ? "active" : ""}`}>
              <Link to="/trade/my" onClick={() => setShowShop(false)}>
                Мои счета
              </Link>
              <Link to="/trade/open" onClick={() => setShowShop(false)}>
                Открыть счет
              </Link>
              <Link to="/trade/connect" onClick={() => setShowShop(false)}>
                Подключить счет
              </Link>
              <Link to="/trade/transactions" onClick={() => setShowShop(false)}>
                Депозитные операции
              </Link>
              <Link to="/trade/history" onClick={() => setShowShop(false)}>
                Торговая история
              </Link>
            </div>
          </li>
          <li className="justify-center">
            <button className="item-center">
              ПЛАТЕЖИ <img src={arrow} alt="arrow" width={10} height={10} />
            </button>
          </li>
          <li className="justify-center">
            <button className="item-center">
              КОМПАНИЯ <img src={arrow} alt="arrow" width={10} height={10} />
            </button>
          </li>
          <li className="justify-center">
            <Link to="/appeals">ОБРАЩЕНИЕ</Link>
          </li>
        </ul>
      </nav>
      <div className="item-center">
        <NmGreenButton className="btn-terminal">WebTerminal</NmGreenButton>
        <button
          className={`item-center profile ${
            showProfile ? "active" : ""
          } c_profile`}
          onClick={() => setShowProfile(!showProfile)}
        >
          <div className={showProfile ? "active" : ""}>
            <img src={profile} alt="profile" width={16} height={16} />
            Мой профиль
          </div>
          <div className={showProfile ? "active" : ""}>
            <div>
              <img src={myprofile} alt="my profile" width={16} height={16} />{" "}
              Мой профиль
            </div>
            <div>
              <img src={exit} alt="exit" width={16} height={16} /> Выход
            </div>
          </div>
        </button>
        <Language />
      </div>
    </header>
  );
};

export default Header;
