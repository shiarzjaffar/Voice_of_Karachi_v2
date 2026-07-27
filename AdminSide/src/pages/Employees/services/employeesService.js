import axios from "axios";

const API = "http://localhost:5000/api/admin";

export const getEmployees = async () => {
  const response = await axios.get(`${API}/employees`);
  return response.data;
};

export const approveEmployee = async (id) => {
  const response = await axios.patch(
    `${API}/employees/${id}/approve`
  );

  return response.data;
};

export const rejectEmployee = async (id) => {
  const response = await axios.patch(
    `${API}/employees/${id}/reject`
  );

  return response.data;
};