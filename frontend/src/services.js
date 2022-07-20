import axios from "axios";

const API_URL = "/api/users/";

//Register User
const register = async (registerData) => {
  try {
    const response = await axios.post(API_URL, registerData);
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

//Login User
const login = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}login`, loginData);
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

//logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
