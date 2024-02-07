import { useState } from "react";
import LocalStorage from "../../services/localStorage";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(!!LocalStorage.get("auth_token"));
  const navigate = useNavigate();

  const login = (token) => {
    setIsAuth(true);
    LocalStorage.set("auth_token", token);
  };

  const logout = () => {
    setIsAuth(false);
    LocalStorage.remove("auth_token");
    navigate("/signin");
  };

  return { isAuth, login, logout };
};
