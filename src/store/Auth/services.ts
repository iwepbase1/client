import { apiClient } from "../../core/networking/apiClient";
import { ADMINLOGIN, AUTH, REGISTER } from "../../core/networking/endpoints";


export const userLogin = async (payload: any) => {
    try {
      const response = await apiClient.post(AUTH, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const userRegister = async (payload: any) => {
    try {
      const response = await apiClient.post(REGISTER, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const adminLogin = async (payload: any) => {
    try {
      const response = await apiClient.post(ADMINLOGIN, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  };