/* eslint-disable */
import { ROOT } from "../../router/config";

export const handleRequestError = (error: any) => {
  console.error("Request Error:", error);
  return Promise.reject(error);
};

export const handleResponseError = (error: any) => {
  console.error("Response Error:", error.response || error.message);
  if (error.response && error.response.status === 500) {
    console.error("Response Error (500):", error.response || error.message);
    // Handle 500 error specifically
  } else {
    console.error("Response Error:", error.response || error.message);
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors, e.g., redirect to login
      window.location.href = ROOT;
    }
  }
  return Promise.reject(error);
};
