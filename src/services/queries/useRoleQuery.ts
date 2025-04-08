import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRole, deleteRole, getRole, getRolePermissions, getRoles, updateRole, updateRolePermissions } from "../api/roleServices";
import { toast } from "react-toastify";
import { IQueryParams, IQueryResponseFromApi } from "@/types/commonQuery";
import { handleAxiosError } from "@/utils/errorHandler";
import { t } from "i18next";
import { IRole, IRolePermissionsResponseFromApi, IUpdateRole } from "@/types/roleTypes";


export const ROLE_QUERY_KEY = {
  all: ["roles"],
  detail: (id: string) => [...ROLE_QUERY_KEY.all, id],
  permissions: (id: string) => [...ROLE_QUERY_KEY.all, id, "permissions"],
};

export const useRoles = (params: IQueryParams = {}) => {
  return useQuery({
    queryKey: [...ROLE_QUERY_KEY.all, params],
    queryFn: () => {
      const newParams = {
        ...params,
        order: `${params.sortBy} ${params.sortOrder}`
      };
      delete newParams.sortBy;
      delete newParams.sortOrder;
      return getRoles(newParams);
    },
  });
};

export const useRole = (id: string) => {
  return useQuery<IQueryResponseFromApi<IRole>>({
    queryKey: ROLE_QUERY_KEY.detail(id),
    queryFn: () => getRole(id),
    enabled: !!id,
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string }) => createRole(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROLE_QUERY_KEY.all });
      toast.success(t("common.createSuccess"));
    },
    onError: (error: unknown) => {
      handleAxiosError({error, customErrorMessages: {
        ALREADY_EXIST: t("error.ALREADY_EXIST_CUSTOM", {itemName: t("roles.role_name")})
      }});
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateRole) => updateRole(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROLE_QUERY_KEY.all });
      toast.success(t("common.updateSuccess"));
    },
    onError: (error: unknown) => {
      handleAxiosError({error, customErrorMessages: {
        ALREADY_EXIST: t("error.ALREADY_EXIST_CUSTOM", {itemName: t("roles.role_name")})
      }});
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROLE_QUERY_KEY.all });
      toast.success(t("common.deleteSuccess"));
    },
    onError: (error: unknown) => {
      handleAxiosError({error});
    },
  });
};

export const useRolePermissions = (id: string) => {
  return useQuery<IQueryResponseFromApi<IRolePermissionsResponseFromApi>>({
    queryKey: ROLE_QUERY_KEY.permissions(id),
    queryFn: () => getRolePermissions(id),
    enabled: !!id,
  });
};

export const useUpdateRolePermissions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, permissions }: { id: string; permissions: string[] }) => 
      updateRolePermissions(id, permissions),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ROLE_QUERY_KEY.permissions(variables.id) });
      queryClient.invalidateQueries({ queryKey: ROLE_QUERY_KEY.detail(variables.id) });
      toast.success(t("roles.permissionsUpdated"));
    },
    onError: (error: unknown) => {
      handleAxiosError({error});
    },
  });
};
