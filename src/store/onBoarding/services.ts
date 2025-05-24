import { apiClient } from "../../core/networking/apiClient";
import { ONBOARDING } from "../../core/networking/endpoints";


export const onBoarding = async (payload: any) => {
    try {
      const response = await apiClient.post(ONBOARDING, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
