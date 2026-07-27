import axios from "axios";

const API = "http://localhost:5000/api/report";

export const getReports = async () => {
  const { data } = await axios.get(`${API}/fetch`, {
    withCredentials: true,
  });

  return data;
};

export const getReport = async (id) => {
  const { data } = await axios.get(`${API}/${id}`, {
    withCredentials: true,
  });

  return data;
};

export const updateReportStatus = async (id, status) => {
  const { data } = await axios.patch(
    `${API}/status/${id}`,
    { status },
    {
      withCredentials: true,
    }
  );

  return data;
};

export const closeReport = async (id) => {
  const { data } = await axios.patch(
    `${API}/close/${id}`,
    {},
    {
      withCredentials: true,
    }
  );

  return data;
};

export const addFeedback = async (id, feedback) => {
  const { data } = await axios.post(
    `${API}/feedback/${id}`,
    { feedback },
    {
      withCredentials: true,
    }
  );

  return data;
};