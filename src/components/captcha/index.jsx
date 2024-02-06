import { useEffect, useRef, useState } from "react";
import reload from "../../assets/images/reload.svg";
import styles from "./captcha.module.scss";

const Captcha = ({ setCaptchaValid }) => {
  const canvasRef = useRef(null);
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const generateCaptchaText = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 6;
    let text = "";
    for (let i = 0; i < length; i++) {
      text += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return text;
  };

  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "blue";
    ctx.font = "25px Captcha";

    const text = generateCaptchaText();
    setCaptchaText(text);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillText(text, 10, 35);
  };

  useEffect(() => {
    drawCaptcha();
  }, []);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleCaptchaSubmit = () => {
    if (userInput === captchaText) {
      setCaptchaValid(true);
    } else {
      setCaptchaValid(false);
      drawCaptcha();
    }
  };

  return (
    <div className={`${styles.captcha} flex-center`}>
      <div className="flex-center">
        <canvas ref={canvasRef} width={120} height={53.2}></canvas>
      </div>
      <img
        src={reload}
        alt="reload"
        width={20}
        height={20}
        onClick={drawCaptcha}
      />
      <input
        type="text"
        maxLength={6}
        value={userInput}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Captcha;
