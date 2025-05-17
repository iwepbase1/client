/* eslint-disable */
import axios from "axios";
import { handleRequestError } from "./errorHandler";
import { store } from "../../store/store";
import { handleServerErrors } from "../functions";

//local
//export const BASE_URL = "http://localhost:3000/v1/";
//dev
export const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000/';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, handleRequestError);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 500) {
      console.error("Internal Server Error:", error.response);

      handleServerErrors();
      // Handle 500 error internally
      return Promise.reject(error);
    }
    return Promise.reject(error); // Pass other errors to the component
  }
);

const makeApiRequest = (
  url: string,
  method: any,
  data = null,
  customHeaders = {}
) => {
  const config = {
    url,
    method,
    headers: {
      ...customHeaders,
    },
    data,
  };

  return apiClient(config);
};

export { apiClient, makeApiRequest };
  function handleServerError() {
    throw new Error("Function not implemented.");
  }

