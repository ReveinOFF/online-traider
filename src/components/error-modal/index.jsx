import { createContext, useEffect, useState } from "react";
import errorIcon from "../../assets/images/signin/error.svg";
import successIcon from "../../assets/images/success.svg";

export const ErrorContext = createContext();

const ErrorModal = ({ children }) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState();
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [typingTimeout, setTypingTimeout] = useState();

  useEffect(() => {
    if (error || success) {
      if (typingTimeout) clearTimeout(typingTimeout);
      setTypingTimeout(
        setTimeout(() => {
          setError(false);
          setSuccess(false);
        }, 5000)
      );
    }
  }, [error, success]);

  return (
    <ErrorContext.Provider
      value={{ setError, setMessage, setSuccessMessage, setSuccess }}
    >
      {(error || success) && (
        <div className="modal-message">
          {error && (
            <div className="errorModal">
              <img src={errorIcon} alt="(!)" width={20} height={20} />
              <span>{message}</span>
            </div>
          )}
          {success && (
            <div className="successModal">
              <img src={successIcon} alt="(\/)" width={20} height={20} />
              <span>{message}</span>
            </div>
          )}
        </div>
      )}
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorModal;
