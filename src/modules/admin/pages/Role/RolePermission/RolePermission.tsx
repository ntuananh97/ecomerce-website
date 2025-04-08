import { useEffect, useState,  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import {
  useRolePermissions,
  useUpdateRole,
} from "@/services/queries/useRoleQuery";
import { useTranslation } from "react-i18next";
import PermissionItemComponent from "./PermissionItem";
import LoadingButton from "@/components/LoadingButton";
import { IRolePermissionResponse } from "@/types/roleTypes";

const RolePermission = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const { data: permissionsData, isLoading: isPermissionsLoading } =
    useRolePermissions(id || "");
  const { mutate: updatePermissions, isPending: isUpdating } =
  useUpdateRole();

  const permissions = permissionsData?.data?.permissions || [];

  useEffect(() => {
    if (permissionsData?.data?.permissions) {
      const newPermissions: string[] = []
      const getPermissions = (item: IRolePermissionResponse) => {
        if (item.checked) {
          newPermissions.push(item.value);
          return
        }

        if (item.children) {
          item.children.forEach(getPermissions);
        }
      }
      permissionsData.data.permissions.forEach(getPermissions);
      setSelectedPermissions(newPermissions);
    }
  }, [permissionsData]);

  const isLoading = isPermissionsLoading;

  const handlePermissionChange = (permission: string) => {
    const isChecked = selectedPermissions.includes(permission);

    if (isChecked) {
      setSelectedPermissions(selectedPermissions.filter(p => p !== permission));
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  const handleSave = () => {
    if (!id) return;

    updatePermissions({
      id,
      data: {
        permissions: selectedPermissions,
      },
    },
  {onSuccess: () => {
    handleBack()
  }});
  };

  const handleBack = () => {
    navigate("/admin/roles");
  };



  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">{t("common.loading")}</span>
      </div>
    );
  }

  return (
    <>
      <title>{t("roles.rolePermissions")}</title>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={handleBack}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">
              {t("roles.permissionsFor")} {permissionsData?.data?.role?.name || ""}
            </h1>
          </div>
          <LoadingButton
            disabled={isUpdating}
            onClick={handleSave}
            className="ml-auto"
            isLoading={isUpdating}
          >
            {t("common.save")}
          </LoadingButton>
        </div>

        <div className="grid gap-4">
          {permissions.map((item) => (
            <PermissionItemComponent
              key={item.value}
              item={item}
              selectedPermissions={selectedPermissions}
              setSelectedPermissions={handlePermissionChange}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RolePermission;
