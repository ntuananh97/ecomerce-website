import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRole, deleteRole, getRole, getRoles, updateRole } from "../api/roleServices";
import { toast } from "react-toastify";
import { IQueryParams } from "@/types/commonQuery";
import { handleAxiosError } from "@/utils/errorHandler";
import { t } from "i18next";


export const ROLE_QUERY_KEY = {
  all: ["roles"],
  detail: (id: string) => [...ROLE_QUERY_KEY.all, id],
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
  return useQuery({
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
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) => updateRole(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ROLE_QUERY_KEY.all });
      queryClient.invalidateQueries({ queryKey: ROLE_QUERY_KEY.detail(variables.id) });
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
