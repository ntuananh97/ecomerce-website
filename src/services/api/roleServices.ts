import { IRole, IUpdateRole } from "@/types/roleTypes";
import { IRoleResponse } from "@/types/roleTypes";
import api from ".";
import { API_ENDPOINT } from "./apiEndpoint";
import { IQueryParams, IQueryResponseFromApi } from "@/types/commonQuery";



export const getRoles = async (params: IQueryParams = {}): Promise<IRoleResponse> => {
  const response = await api.get(API_ENDPOINT.ROLE.INDEX, { params });
  return response.data;
};

export const getRole = async (id: string): Promise<IQueryResponseFromApi<IRole>> => {
  const response = await api.get(`${API_ENDPOINT.ROLE.INDEX}/${id}`);
  return response.data;
};

export const createRole = async (data: { name: string }): Promise<IRole> => {
  const response = await api.post(API_ENDPOINT.ROLE.INDEX, data);
  return response.data;
};

export const updateRole = async (id: string, data: IUpdateRole['data']): Promise<IRole> => {
  const response = await api.put(`${API_ENDPOINT.ROLE.INDEX}/${id}`, data);
  return response.data;
};

export const deleteRole = async (id: string): Promise<void> => {
  const response = await api.delete(`${API_ENDPOINT.ROLE.INDEX}/${id}`);
  return response.data;
};

export const getRolePermissions = async (id: string) => {
  const response = await api.get(`${API_ENDPOINT.ROLE.INDEX}/${id}/permissions`);
  return response.data;
};

export const updateRolePermissions = async (id: string, permissions: string[]) => {
  const response = await api.put(`${API_ENDPOINT.ROLE.INDEX}/${id}`, { permissions });
  return response.data;
};
