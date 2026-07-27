import axios from "axios";

const API = "http://localhost:5000/api/admin";

export const getUsers = async () => {
  const response = await axios.get(`${API}/users`);
  return response.data;
};

export const toggleUserStatus = async (id) => {
  const response = await axios.put(
    `${API}/user-status/${id}`
  );

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(
    `${API}/user-delete/${id}`
  );

  return response.data;
};