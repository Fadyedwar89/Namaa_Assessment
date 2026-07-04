import axiosInstance from "../api/axios";

const register = async (data) => {
  const response = await axiosInstance.post("Authentication/Register", data);

  return response.data;
};

const login = async (data) => {
  const response = await axiosInstance.post("Authentication/Login", data);

  return response.data;
};

export default {
  register,
  login,
};
