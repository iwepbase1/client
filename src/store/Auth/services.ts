import { apiClient } from "../../core/networking/apiClient";
import { AUTH } from "../../core/networking/endpoints";


export const userLogin = async (payload: any) => {
    try {
      const response = await apiClient.post(AUTH, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  };