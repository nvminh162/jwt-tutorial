import axios from "axios";

export const loginAPI = (username: string, password: string) => {
  return axios.post("http://localhost:8080/api/login", {
    username,
    password,
  });
};

export const getAccountAPI = (access_token: string) => {
  return axios.get("http://localhost:8080/api/account", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
};
