import { Link, useNavigate } from "react-router-dom";
import "./header.style.scss";
import arrow from "../../assets/images/arrow.svg";
import arrow_first from "../../assets/images/arrow_first.svg";
import Language from "../language";
import { NmGreenButton } from "../buttons";
import profile from "../../assets/images/header/profile.svg";
import { useEffect, useState } from "react";
import myprofile from "../../assets/images/header/myprofile.svg";
import exit from "../../assets/images/header/exit.svg";
import close from "../../assets/images/close.svg";
import burger from "../../assets/images/header/burger-menu.svg";
import LocalStorage from "../../services/localStorage";
import axios from "axios";
import DataCreate from "../data-create";
import { useAuth } from "../isAuth";

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [showBurger, setShowBurger] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const changeShowProfile = (e) => {
    if (!e.target.closest(".c_profile")) setShowProfile(false);
  };

  const changeShowShop = (e) => {
    if (!e.target.closest(".c_shop")) setShowShop(false);
  };

  const changeShowPayment = (e) => {
    if (!e.target.closest(".c_payment")) setShowPayment(false);
  };

  const changeShowCompany = (e) => {
    if (!e.target.closest(".c_company")) setShowCompany(false);
  };

  const Logout = () => {
    const { key, rand_param } = DataCreate();

    axios
      .get("https://cabinet.itcyclonelp.com/api/v_2/page/Logout", {
        params: {
          key,
          rand_param,
          auth_token: LocalStorage.get("auth_token"),
        },
      })
      .then((e) => {
        if (e.data.result === "success") {
          logout();
        }
      });
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

  useEffect(() => {
    if (showShop) {
      document.addEventListener("click", changeShowShop);
    } else {
      document.removeEventListener("click", changeShowShop);
    }

    return () => {
      document.removeEventListener("click", changeShowShop);
    };
  }, [showShop]);

  useEffect(() => {
    if (showPayment) {
      document.addEventListener("click", changeShowPayment);
    } else {
      document.removeEventListener("click", changeShowPayment);
    }

    return () => {
      document.removeEventListener("click", changeShowPayment);
    };
  }, [showPayment]);

  useEffect(() => {
    if (showCompany) {
      document.addEventListener("click", changeShowCompany);
    } else {
      document.removeEventListener("click", changeShowCompany);
    }

    return () => {
      document.removeEventListener("click", changeShowCompany);
    };
  }, [showCompany]);

  return (
    <header>
      <nav>
        <ul>
          <li className="justify-center c_shop">
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
          <li className="justify-center c_payment">
            <button
              className="item-center"
              onClick={() => setShowPayment(!showPayment)}
            >
              ПЛАТЕЖИ <img src={arrow} alt="arrow" width={10} height={10} />
            </button>
            <div className={`h_dropdown ${showPayment ? "active" : ""}`}>
              <Link to="/payment/my" onClick={() => setShowPayment(false)}>
                Мои заявки
              </Link>
              <Link
                to="/payment/conclusion"
                onClick={() => setShowPayment(false)}
              >
                Ввод средств
              </Link>
              <Link
                to="/payment/transfer"
                onClick={() => setShowPayment(false)}
              >
                Вывод средств
              </Link>
            </div>
          </li>
          <li className="justify-center c_company">
            <button
              className="item-center"
              onClick={() => setShowCompany(!showCompany)}
            >
              КОМПАНИЯ <img src={arrow} alt="arrow" width={10} height={10} />
            </button>
            <div className={`h_dropdown ${showCompany ? "active" : ""}`}>
              <Link to="/trade/documents" onClick={() => setShowCompany(false)}>
                Документы
              </Link>
            </div>
          </li>
          <li className="justify-center">
            <Link to="/appeals" className="item-center">
              ОБРАЩЕНИЕ
            </Link>
          </li>
        </ul>
      </nav>
      <div className="item-center r-l">
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
            <Link to="/">
              <img src={myprofile} alt="my profile" width={16} height={16} />{" "}
              Мой профиль
            </Link>
            <div onClick={Logout}>
              <img src={exit} alt="exit" width={16} height={16} /> Выход
            </div>
          </div>
        </button>
        <Language />
      </div>
      <div className="h-mob">
        <div>
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
              <Link to="/">
                <img src={myprofile} alt="my profile" width={16} height={16} />{" "}
                Мой профиль
              </Link>
              <div onClick={Logout}>
                <img src={exit} alt="exit" width={16} height={16} /> Выход
              </div>
            </div>
          </button>
          <Language />
        </div>
        <div onClick={() => setShowBurger(true)}>
          <img src={burger} alt="burger menu" width={30} height={30} />
        </div>
      </div>
      <div
        className={`burger-bg ${showBurger ? "active" : ""}`}
        onClick={() => setShowBurger(false)}
      ></div>
      <div className={`burger ${showBurger ? "active" : ""}`}>
        <button className="flex-center" onClick={() => setShowBurger(false)}>
          <img src={close} alt="close" width={20} height={20} />
        </button>
        <nav>
          <ul>
            <li className="c_shop">
              <button
                className={showShop ? "active" : ""}
                onClick={() => setShowShop(!showShop)}
              >
                <div>ТОРГОВЛЯ</div>
                <img src={arrow} alt="arrow" width={11} height={11} />
              </button>
              <div className={showShop ? "active" : ""}>
                <Link to="/trade/my" onClick={() => setShowShop(false)}>
                  Мои счета
                </Link>
                <Link to="/trade/open" onClick={() => setShowShop(false)}>
                  Открыть счет
                </Link>
                <Link to="/trade/connect" onClick={() => setShowShop(false)}>
                  Подключить счет
                </Link>
                <Link
                  to="/trade/transactions"
                  onClick={() => setShowShop(false)}
                >
                  Депозитные операции
                </Link>
                <Link to="/trade/history" onClick={() => setShowShop(false)}>
                  Торговая история
                </Link>
              </div>
            </li>
            <li className="c_payment">
              <button
                className={showPayment ? "active" : ""}
                onClick={() => setShowPayment(!showPayment)}
              >
                <div>ПЛАТЕЖИ</div>
                <img src={arrow} alt="arrow" width={11} height={11} />
              </button>
              <div className={showPayment ? "active" : ""}>
                <Link to="/payment/my" onClick={() => setShowPayment(false)}>
                  Мои заявки
                </Link>
                <Link
                  to="/payment/conclusion"
                  onClick={() => setShowPayment(false)}
                >
                  Ввод средств
                </Link>
                <Link
                  to="/payment/transfer"
                  onClick={() => setShowPayment(false)}
                >
                  Вывод средств
                </Link>
              </div>
            </li>
            <li className="c_company">
              <button
                className={showCompany ? "active" : ""}
                onClick={() => setShowCompany(!showCompany)}
              >
                <div>КОМПАНИЯ</div>
                <img src={arrow} alt="arrow" width={11} height={11} />
              </button>
              <div className={showCompany ? "active" : ""}>
                <Link
                  to="/trade/documents"
                  onClick={() => setShowCompany(false)}
                >
                  Документы
                </Link>
              </div>
            </li>
            <li>
              <Link to="/appeals">ОБРАЩЕНИЯ</Link>
            </li>
          </ul>
        </nav>

        <div>
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
              <Link to="/">
                <img src={myprofile} alt="my profile" width={16} height={16} />{" "}
                Мой профиль
              </Link>
              <div onClick={Logout}>
                <img src={exit} alt="exit" width={16} height={16} /> Выход
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
