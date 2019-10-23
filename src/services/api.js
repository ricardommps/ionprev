import axios from "axios";

const api = axios.create({
  baseURL:
    parseInt(process.env.VUE_APP_API_PORT) === 80
      ? process.env.VUE_APP_API_HOST
      : `${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}`
});

export default api;
