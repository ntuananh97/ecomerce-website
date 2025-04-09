import { PERMISSIONS } from "@/constants/permissions";
import useAuthStore from "@/store/useAuthStore";

const isAdmin = (permissions: string[]): boolean => permissions.includes(PERMISSIONS.ADMIN);

export const hasPermission = (permissions: string[]): boolean => {
  const user = useAuthStore.getState().user;
  if (!user) return false;
  if (isAdmin(user.role.permissions)) return true;
  return permissions.some((p) => user.role.permissions.includes(p));
};
