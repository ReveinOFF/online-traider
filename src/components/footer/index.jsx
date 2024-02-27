import { useEffect, useState } from "react";
import "./footer.style.scss";
import axios from "axios";
import DataCreate from "../../utils/data-create";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [copyright, setCopyright] = useState("");
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const { key, rand_param } = DataCreate();

    axios
      .get("https://cabinet.itcyclonelp.com/api/v_2/settings/GetSettings", {
        params: {
          key,
          rand_param,
          languages: i18n.language,
        },
      })
      .then((res) => {
        setCopyright(res.data.values.copyright);
      });
  }, []);
  return (
    <footer className="roboto justify-center">{copyright ?? copyright}</footer>
  );
};

export default Footer;
