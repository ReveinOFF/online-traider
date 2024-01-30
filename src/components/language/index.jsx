import russian from "../../assets/images/russian.png";
import english from "../../assets/images/english.png";
import "./language.style.scss";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const Language = ({ className }) => {
  const [showLng, setShowLng] = useState(false);
  const { i18n } = useTranslation();

  const changeShowLng = (e) => {
    if (!e.target.closest(".lng")) setShowLng(false);
  };

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lng", lang);
    setShowLng(false);
  };

  useEffect(() => {
    if (showLng) {
      document.addEventListener("click", changeShowLng);
    } else {
      document.removeEventListener("click", changeShowLng);
    }

    return () => {
      document.removeEventListener("click", changeShowLng);
    };
  }, [showLng]);

  return (
    <div
      className={`lng ${className || ""} ${showLng ? "show-lng-block" : ""}`}
    >
      <img
        src={i18n.language === "ru" ? russian : english}
        alt={i18n.language === "ru" ? "russian" : "english"}
        width={16}
        height={16}
        onClick={() => setShowLng(!showLng)}
      />
      <img
        src={i18n.language !== "ru" ? russian : english}
        alt={i18n.language !== "ru" ? "russian" : "english"}
        className={showLng ? "show_lng" : "hidden_lng"}
        width={16}
        height={16}
        onClick={() => changeLang(i18n.language !== "ru" ? "ru" : "en")}
      />
    </div>
  );
};

export default Language;
