import { getDataFromCookie, setDataToCookie } from "@data-service";
import axios from "axios";

const request = axios.create({
  baseURL: "https://service.olimjanov.uz/v1",
});

async function refreshAccessToken() {
  try {
    const refresh_token = getDataFromCookie("refresh_token");

    if (!refresh_token) {
      throw new Error("refresh token yo'q");
    }

    const response = await axios.post(
      `https://service.olimjanov.uz/v1/auth/refresh-accesstoken/${refresh_token}`
    );

    const { access_token } = response.data;
    if (access_token) {
      setDataToCookie("access_token", access_token);
    }
    return access_token;
  } catch (error) {
    console.log(error);
  }
}

request.interceptors.request.use((config) => {
  const access_token = getDataFromCookie("access_token");
  if (access_token) {
    config.headers["Authorization"] = access_token;
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const access_token = await refreshAccessToken();
      if (access_token) {
        const originalRequest = error.config;
        originalRequest.headers[`Authorization`] = access_token;
      } else {
        console.log(
          `Failed to refresh acces token. Redicarting to login page...`
        );
        return Promise.reject(error);
      }
    }
  }
);

export default request;
