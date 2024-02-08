import axios from "axios";

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 605) {
      localStorage.removeItem("auth_token");
      window.location.reload();
      window.location.pathname = "/signin";
    }
    return error;
  }
);
