// handles API calls for login/register

import axiosInstance from "./axiosInstance";

export const login = async (email, password) => {
  const res = await axiosInstance.post("/api/auth/login", { email, password });
  return res.data;
};

export const register = async (email, password) => {
  const res = await axiosInstance.post("/api/auth/register", { email, password });
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await axiosInstance.get("/api/auth/me");
  return res.data;
};
