import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// setup when request
http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// setup when response
http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error.message);
    return Promise.reject(error);
  }
);

export default http;
