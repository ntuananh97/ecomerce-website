import { ILoginFormValues, IRegisterFormValues, IAuthResponse, IGetMeResponse, IUpdateMeFormValues } from "@/types/authTypes";
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

export const getMe = async (): Promise<IGetMeResponse> => {
  const response = await api.get(API_ENDPOINT.AUTH.AUTH_ME);
  return response.data;
};

export const updateMe = async (data: IUpdateMeFormValues) => {
  const response = await api.put(API_ENDPOINT.AUTH.AUTH_ME, data);
  return response.data;
};

