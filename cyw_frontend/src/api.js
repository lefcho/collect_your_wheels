import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";


const refreshApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const refreshToken = async () => {

    const refresh_token = localStorage.getItem(REFRESH_TOKEN);

    try {
        const response = await refreshApi.post("api/token/refresh/", {
            refresh: refresh_token,
        });

        if (response.status === 200) {
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            return response.data.access;
        }
    } catch (err) {
        console.error("Refresh token failed", err);
    }
};


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});


api.interceptors.request.use(
    async (config) => {

        let token = localStorage.getItem(ACCESS_TOKEN);

        if (token) {
            try {

                const decoded = jwtDecode(token);
                const tokenExpiration = decoded.exp;
                const now = Date.now() / 1000;

                if (tokenExpiration < now) {
                    token = await refreshToken();
                }
            } catch (err) {
                console.error("Error decoding token:", err);
            }

            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
