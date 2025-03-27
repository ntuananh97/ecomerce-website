import { ILoginFormValues, IRegisterFormValues, IAuthResponse } from "@/types/authTypes";
import api from ".";
import { API_ENDPOINT } from "./apiEndpoint";

export const register = async (data: IRegisterFormValues) => {
  const response = await api.post(API_ENDPOINT.AUTH.REGISTER, data);
  return response.data;
};

export const login = async (data: ILoginFormValues): Promise<IAuthResponse> => {
  const response = await api.post(API_ENDPOINT.AUTH.LOGIN, data);
  return response.data;
};
