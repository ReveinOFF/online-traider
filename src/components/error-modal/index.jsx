import { createContext, useEffect, useState } from "react";
import errorIcon from "../../assets/images/signin/error.svg";

export const ErrorContext = createContext();

const ErrorModal = ({ children }) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState();

  useEffect(() => {
    if (error) {
      if (typingTimeout) clearTimeout(typingTimeout);
      setTypingTimeout(
        setTimeout(() => {
          setError(false);
        }, 5000)
      );
    }
  }, [error]);

  return (
    <ErrorContext.Provider value={{ setError, setMessage }}>
      {error && (
        <div className="errorModal">
          <img src={errorIcon} alt="(!)" />
          <span>{message}</span>
        </div>
      )}
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorModal;
