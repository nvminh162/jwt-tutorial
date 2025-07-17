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



export const getUsersApi = () => {
    const access_token = localStorage.getItem("access_token")
    const url = "http://localhost:8080/api/users";
    return axios.get(url, {
        headers: { Authorization: `Bearer ${access_token}` }
    })
}

export const createUserApi = (
    fullName: string, email: string,
    password: string, confirmPassword: string
) => {
    const access_token = localStorage.getItem("access_token")
    const url = "http://localhost:8080/api/users";
    return axios.post(url,
        { fullName, email, password, confirmPassword },
        {
            headers: { Authorization: `Bearer ${access_token}` }
        })
}

export const updateUserApi = (id: number, fullName: string, address: string, phone: string) => {
    const access_token = localStorage.getItem("access_token")
    const url = `http://localhost:8080/api/users/${id}`;
    return axios.put(url, { fullName, address, phone },
        {
            headers: { Authorization: `Bearer ${access_token}` }
        })
}

export const deleteUserApi = (id: number) => {
    const access_token = localStorage.getItem("access_token")
    const url = `http://localhost:8080/api/users/${id}`;
    return axios.delete(url, {
        headers: { Authorization: `Bearer ${access_token}` }
    })
}