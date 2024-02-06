import { Link, useNavigate } from "react-router-dom";
import arrow from "../../assets/images/arrow.svg";
import arrow_first from "../../assets/images/arrow_first.svg";
import Language from "../language";
import { NmGreenButton } from "../buttons";
import profile from "../../assets/images/header/profile.svg";
import { useEffect, useState } from "react";
import myprofile from "../../assets/images/header/myprofile.svg";
import exit from "../../assets/images/header/exit.svg";
import LocalStorage from "../../services/localStorage";
import burger from "../../assets/images/header/burger-menu.svg";
import close from "../../assets/images/close.svg";
import axios from "axios";
import DataCreate from "../data-create";

const AdminHeader = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [showService, setShowService] = useState(false);
  const [showBurger, setShowBurger] = useState(false);
  const navigate = useNavigate();

  const changeShowProfile = (e) => {
    if (!e.target.closest(".c_profile")) setShowProfile(false);
  };

  const changeShowSetting = (e) => {
    if (!e.target.closest(".c_setting")) setShowSetting(false);
  };

  const changeShowService = (e) => {
    if (!e.target.closest(".c_service")) setShowService(false);
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
    if (showSetting) {
      document.addEventListener("click", changeShowSetting);
    } else {
      document.removeEventListener("click", changeShowSetting);
    }

    return () => {
      document.removeEventListener("click", changeShowSetting);
    };
  }, [showSetting]);

  useEffect(() => {
    if (showService) {
      document.addEventListener("click", changeShowService);
    } else {
      document.removeEventListener("click", changeShowService);
    }

    return () => {
      document.removeEventListener("click", changeShowService);
    };
  }, [showService]);

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
          LocalStorage.remove("auth_token");
          navigate("/signin");
        }
      });
  };

  return (
    <header>
      <nav>
        <ul className="item-center">
          <li className="justify-center c_setting">
            <button
              className="item-center"
              onClick={() => setShowSetting(!showSetting)}
            >
              НАСТРОЙКИ{" "}
              <img
                src={arrow_first}
                className={showSetting ? "active" : ""}
                alt="arrow"
                width={10}
                height={10}
              />
            </button>
            <div className={`h_dropdown ${showSetting ? "active" : ""}`}>
              <Link
                to="/admin/setting/documents"
                onClick={() => setShowSetting(false)}
              >
                Документы
              </Link>
              <Link
                to="/admin/setting/office"
                onClick={() => setShowSetting(false)}
              >
                Личный кабинет
              </Link>
              <Link
                to="/admin/setting/payments"
                onClick={() => setShowSetting(false)}
              >
                Платежные системы
              </Link>
              <Link
                to="/admin/setting/servers"
                onClick={() => setShowSetting(false)}
              >
                Серверы
              </Link>
              <Link
                to="/admin/setting/account"
                onClick={() => setShowSetting(false)}
              >
                Типы счетов
              </Link>
              <Link
                to="/admin/setting/lang"
                onClick={() => setShowSetting(false)}
              >
                Языки
              </Link>
              <Link
                to="/admin/setting/method"
                onClick={() => setShowSetting(false)}
              >
                Методы оплаты
              </Link>
            </div>
          </li>
          <li className="justify-center c_service">
            <button
              className="item-center"
              onClick={() => setShowService(!showService)}
            >
              СЕРВИС <img src={arrow} alt="arrow" width={10} height={10} />
            </button>
            <div className={`h_dropdown ${showService ? "active" : ""}`}>
              <Link
                to="/admin/services/email"
                onClick={() => setShowService(false)}
              >
                Email рассылка
              </Link>
              <Link
                to="/admin/services/course"
                onClick={() => setShowService(false)}
              >
                Курсы валют
              </Link>
              <Link
                to="/admin/services/templates"
                onClick={() => setShowService(false)}
              >
                Шаблоны писем
              </Link>
              <Link
                to="/admin/services/shares"
                onClick={() => setShowService(false)}
              >
                Акции
              </Link>
              <Link
                to="/admin/services/orders"
                onClick={() => setShowService(false)}
              >
                Новые заявки
              </Link>
              <Link
                to="/admin/services/management"
                onClick={() => setShowService(false)}
              >
                Управление счетами
              </Link>
              <Link
                to="/admin/services/users"
                onClick={() => setShowService(false)}
              >
                Управление пользователями
              </Link>
              <Link
                to="/admin/services/payment"
                onClick={() => setShowService(false)}
              >
                Ввод\вывод средств
              </Link>
              <Link
                to="/admin/services/report"
                onClick={() => setShowService(false)}
              >
                Отчет по платежным системам
              </Link>
            </div>
          </li>
          <li className="justify-center">
            <Link to="/admin/appeals">ОБРАЩЕНИЕ</Link>
          </li>
        </ul>
      </nav>
      <div className="item-center">
        <NmGreenButton className="btn-terminal ml-big">
          WebTerminal
        </NmGreenButton>
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
            <Link to="/admin/">
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
            <li className="c_setting">
              <button
                className={showSetting ? "active" : ""}
                onClick={() => setShowSetting(!showSetting)}
              >
                <div>НАСТРОЙКИ</div>
                <img src={arrow} alt="arrow" width={11} height={11} />
              </button>
              <div className={showSetting ? "active" : ""}>
                <Link
                  to="/admin/setting/documents"
                  onClick={() => setShowSetting(false)}
                >
                  Документы
                </Link>
                <Link
                  to="/admin/setting/office"
                  onClick={() => setShowSetting(false)}
                >
                  Личный кабинет
                </Link>
                <Link
                  to="/admin/setting/payments"
                  onClick={() => setShowSetting(false)}
                >
                  Платежные системы
                </Link>
                <Link
                  to="/admin/setting/servers"
                  onClick={() => setShowSetting(false)}
                >
                  Серверы
                </Link>
                <Link
                  to="/admin/setting/account"
                  onClick={() => setShowSetting(false)}
                >
                  Типы счетов
                </Link>
                <Link
                  to="/admin/setting/lang"
                  onClick={() => setShowSetting(false)}
                >
                  Языки
                </Link>
                <Link
                  to="/admin/setting/method"
                  onClick={() => setShowSetting(false)}
                >
                  Методы оплаты
                </Link>
              </div>
            </li>
            <li className="c_service">
              <button
                className={showService ? "active" : ""}
                onClick={() => setShowService(!showService)}
              >
                <div>СЕРВИС</div>
                <img src={arrow} alt="arrow" width={11} height={11} />
              </button>
              <div className={showService ? "active" : ""}>
                <Link
                  to="/admin/services/email"
                  onClick={() => setShowService(false)}
                >
                  Email рассылка
                </Link>
                <Link
                  to="/admin/services/course"
                  onClick={() => setShowService(false)}
                >
                  Курсы валют
                </Link>
                <Link
                  to="/admin/services/templates"
                  onClick={() => setShowService(false)}
                >
                  Шаблоны писем
                </Link>
                <Link
                  to="/admin/services/shares"
                  onClick={() => setShowService(false)}
                >
                  Акции
                </Link>
                <Link
                  to="/admin/services/orders"
                  onClick={() => setShowService(false)}
                >
                  Новые заявки
                </Link>
                <Link
                  to="/admin/services/management"
                  onClick={() => setShowService(false)}
                >
                  Управление счетами
                </Link>
                <Link
                  to="/admin/services/users"
                  onClick={() => setShowService(false)}
                >
                  Управление пользователями
                </Link>
                <Link
                  to="/admin/services/payment"
                  onClick={() => setShowService(false)}
                >
                  Ввод\вывод средств
                </Link>
                <Link
                  to="/admin/services/report"
                  onClick={() => setShowService(false)}
                >
                  Отчет по платежным системам
                </Link>
              </div>
            </li>
            <li>
              <Link to="/admin/appeals">ОБРАЩЕНИЕ</Link>
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
              <Link to="/admin/">
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

export default AdminHeader;
