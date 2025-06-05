import { REQUST_TYPE } from "../../core/constants";
import { makeApiRequest } from "../../core/networking/apiClient";
import { GETALLINTERESTS } from "../../core/networking/endpoints";


  export const getAllInterest = async (payload: any) => {
  try {
    const response = await makeApiRequest(GETALLINTERESTS, REQUST_TYPE.GET, payload, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};
