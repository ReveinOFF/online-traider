import axios from "axios";

axios.interceptors.response.use(
  (resp) => {
    if (resp.data.error_number === 605) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_id");
      window.location.pathname = "/signin";
    }
    return resp;
  },
  (error) => {
    return Promise.reject(error);
  }
);
