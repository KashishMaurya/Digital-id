import axiosInstance from "./axiosInstance";

export const getCurrentUser = async () => {
  const res = await axiosInstance.get("/api/auth/me");
  return res.data;
};

export const logoutUser = async () => {
  const res = await axiosInstance.post("/api/auth/logout");
  return res.data;
};
