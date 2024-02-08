import { useState } from "react";
import LocalStorage from "../../services/localStorage";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(!!LocalStorage.get("auth_token"));

  const login = (token, id) => {
    setIsAuth(true);
    LocalStorage.set("auth_token", token);
    LocalStorage.set("user_id", id);
    window.location.reload();
  };

  const logout = () => {
    setIsAuth(false);
    LocalStorage.remove("auth_token");
    LocalStorage.remove("user_id");
    window.location.reload();
  };

  return { isAuth, login, logout };
};
