import { useState } from "react";
import LocalStorage from "../../services/localStorage";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(!!LocalStorage.get("auth_token"));
  const navigate = useNavigate();

  const login = (token, id) => {
    setIsAuth(true);
    LocalStorage.set("auth_token", token);
    LocalStorage.set("user_id", id);
  };

  const logout = () => {
    setIsAuth(false);
    LocalStorage.remove("auth_token");
    LocalStorage.remove("user_id");
    navigate("/signin");
  };

  return { isAuth, login, logout };
};
