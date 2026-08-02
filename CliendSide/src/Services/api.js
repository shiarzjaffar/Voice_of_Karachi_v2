import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.response.use(

    (response) => response,

    async (error) => {

        if (error.response?.status === 401) {

            try {

                await fetch(
                    "http://localhost:5000/api/auth/logout",
                    {
                        method: "POST",
                        credentials: "include",
                    }
                );

            } catch (err) {

                console.error(err);

            }

            localStorage.clear();

            window.location.href = "/login";

        }

        return Promise.reject(error);

    }

);

export default api;