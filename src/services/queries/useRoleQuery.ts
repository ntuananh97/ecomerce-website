import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRole, deleteRole, getRole, getRoles, updateRole } from "../api/roleServices";
import { toast } from "react-toastify";
import { IQueryParams } from "@/types/commonQuery";

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

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
      toast.success("Role created successfully");
    },
    onError: (error: ErrorResponse) => {
      toast.error(error?.response?.data?.message || "Failed to create role");
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
      toast.success("Role updated successfully");
    },
    onError: (error: ErrorResponse) => {
      toast.error(error?.response?.data?.message || "Failed to update role");
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROLE_QUERY_KEY.all });
      toast.success("Role deleted successfully");
    },
    onError: (error: ErrorResponse) => {
      toast.error(error?.response?.data?.message || "Failed to delete role");
    },
  });
};
