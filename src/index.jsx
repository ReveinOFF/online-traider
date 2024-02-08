import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { BrowserRouter } from "react-router-dom";
import ErrorModal from "./components/error-modal";
import "./axios";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ErrorModal>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorModal>
    </I18nextProvider>
  </React.StrictMode>
);

reportWebVitals();
