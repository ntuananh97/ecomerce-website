import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { useRolePermissions, useUpdateRolePermissions } from "@/services/queries/useRoleQuery";
import { useRole } from "@/services/queries/useRoleQuery";
import { LIST_DATA_PERMISSIONS, type PermissionItem } from "@/constants/permissions";
import { PERMISSIONS } from "@/constants/permissions";
import { useTranslation } from "react-i18next";

interface PermissionCheckboxProps {
  permission: string;
  checked: boolean;
  onChange: (permission: string, checked: boolean) => void;
  label: string;
  disabled?: boolean;
}

const PermissionCheckbox: React.FC<PermissionCheckboxProps> = ({
  permission,
  checked,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={permission}
        checked={checked}
        onCheckedChange={(checked) => onChange(permission, checked === true)}
        disabled={disabled}
      />
      <label
        htmlFor={permission}
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
          disabled ? "opacity-50" : ""
        }`}
      >
        {label}
      </label>
    </div>
  );
};

interface PermissionGroupProps {
  title: string;
  children: React.ReactNode;
  isParent?: boolean;
}

const PermissionGroup: React.FC<PermissionGroupProps> = ({
  title,
  children,
  isParent = false,
}) => {
  return (
    <Card className={`${isParent ? "mb-6" : "mb-4"}`}>
      <CardHeader className={`pb-2 ${isParent ? "bg-secondary/20" : ""}`}>
        <CardTitle className={`${isParent ? "text-xl" : "text-md"}`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const RolePermission = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(new Set());
  
  const { data: role, isLoading: isRoleLoading } = useRole(id || "");
  const { data: permissionsData, isLoading: isPermissionsLoading } = useRolePermissions(id || "");
  const { mutate: updatePermissions, isPending: isUpdating } = useUpdateRolePermissions();

  useEffect(() => {
    if (permissionsData?.data?.permissions) {
      setSelectedPermissions(new Set(permissionsData.data.permissions));
    }
  }, [permissionsData]);

  const isLoading = isRoleLoading || isPermissionsLoading;

  const handlePermissionChange = (permission: string, checked: boolean) => {
    const newPermissions = new Set(selectedPermissions);
    
    if (checked) {
      newPermissions.add(permission);
    } else {
      newPermissions.delete(permission);
    }
    
    setSelectedPermissions(newPermissions);
  };

  const handleSave = () => {
    if (!id) return;
    
    updatePermissions({
      id,
      permissions: Array.from(selectedPermissions),
    });
  };

  const handleBack = () => {
    navigate("/admin/roles");
  };

  const hasPermission = (permissionValue: string): boolean => {
    return selectedPermissions.has(permissionValue);
  };

  // Group permissions by parent
  const permissionsByParent: Record<string, PermissionItem[]> = {};
  
  LIST_DATA_PERMISSIONS.forEach((item) => {
    if (item.isParent) {
      if (!permissionsByParent[item.value]) {
        permissionsByParent[item.value] = [];
      }
    } else if (item.parentValue) {
      if (!permissionsByParent[item.parentValue]) {
        permissionsByParent[item.parentValue] = [];
      }
      permissionsByParent[item.parentValue].push(item);
    } else {
      // Standalone permissions without a parent
      if (!permissionsByParent["OTHER"]) {
        permissionsByParent["OTHER"] = [];
      }
      permissionsByParent["OTHER"].push(item);
    }
  });

  const permissionLabels = {
    VIEW: t("permissions.view"),
    CREATE: t("permissions.create"),
    UPDATE: t("permissions.update"),
    DELETE: t("permissions.delete"),
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
              {t("roles.permissionsFor")} {role?.data?.name || ""}
            </h1>
          </div>
          <Button 
            disabled={isUpdating} 
            onClick={handleSave}
            className="ml-auto"
          >
            {isUpdating ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {t("common.save")}
          </Button>
        </div>

        <div className="grid gap-4">
          {Object.entries(permissionsByParent).map(([parentKey, childItems]) => {
            if (parentKey === "OTHER") {
              return (
                <div key="OTHER" className="space-y-4">
                  {childItems.map((item) => {
                    const permissionName = t(`permissions.${item.name.toLowerCase()}`);
                    
                    // Find permission values from PERMISSIONS object
                    const viewPermission = !item.isHideView 
                      ? (PERMISSIONS as any)[item.value]?.VIEW || (PERMISSIONS as any)[item.value] 
                      : undefined;
                    const createPermission = !item.isHideCreate 
                      ? (PERMISSIONS as any)[item.value]?.CREATE 
                      : undefined;
                    const updatePermission = !item.isHideUpdate 
                      ? (PERMISSIONS as any)[item.value]?.UPDATE 
                      : undefined;
                    const deletePermission = !item.isHideDelete 
                      ? (PERMISSIONS as any)[item.value]?.DELETE 
                      : undefined;

                    return (
                      <Card key={item.id} className="mb-4">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">{permissionName}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {viewPermission && (
                              <PermissionCheckbox
                                permission={viewPermission}
                                checked={hasPermission(viewPermission)}
                                onChange={handlePermissionChange}
                                label={permissionLabels.VIEW}
                              />
                            )}
                            {createPermission && (
                              <PermissionCheckbox
                                permission={createPermission}
                                checked={hasPermission(createPermission)}
                                onChange={handlePermissionChange}
                                label={permissionLabels.CREATE}
                              />
                            )}
                            {updatePermission && (
                              <PermissionCheckbox
                                permission={updatePermission}
                                checked={hasPermission(updatePermission)}
                                onChange={handlePermissionChange}
                                label={permissionLabels.UPDATE}
                              />
                            )}
                            {deletePermission && (
                              <PermissionCheckbox
                                permission={deletePermission}
                                checked={hasPermission(deletePermission)}
                                onChange={handlePermissionChange}
                                label={permissionLabels.DELETE}
                              />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              );
            }

            // Find the parent item
            const parentItem = LIST_DATA_PERMISSIONS.find(
              (item) => item.isParent && item.value === parentKey
            );
            
            if (!parentItem) return null;
            
            const parentName = t(`permissions.${parentItem.name.toLowerCase()}`);

            return (
              <PermissionGroup 
                key={parentKey} 
                title={parentName}
                isParent={true}
              >
                <div className="space-y-4">
                  {childItems.map((childItem) => {
                    const permissionName = t(`permissions.${childItem.name.toLowerCase()}`);
                    const parentUpperCase = childItem.parentValue?.toUpperCase();
                    const childUpperCase = childItem.value.toUpperCase();

                    // Find permission values from PERMISSIONS object using safe accessing
                    const viewPermission = !childItem.isHideView && parentUpperCase && childUpperCase
                      ? (PERMISSIONS as any)[parentUpperCase]?.[childUpperCase]?.VIEW 
                      : undefined;
                    const createPermission = !childItem.isHideCreate && parentUpperCase && childUpperCase
                      ? (PERMISSIONS as any)[parentUpperCase]?.[childUpperCase]?.CREATE 
                      : undefined;
                    const updatePermission = !childItem.isHideUpdate && parentUpperCase && childUpperCase
                      ? (PERMISSIONS as any)[parentUpperCase]?.[childUpperCase]?.UPDATE 
                      : undefined;
                    const deletePermission = !childItem.isHideDelete && parentUpperCase && childUpperCase
                      ? (PERMISSIONS as any)[parentUpperCase]?.[childUpperCase]?.DELETE 
                      : undefined;

                    return (
                      <PermissionGroup key={childItem.id} title={permissionName}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {viewPermission && (
                            <PermissionCheckbox
                              permission={viewPermission}
                              checked={hasPermission(viewPermission)}
                              onChange={handlePermissionChange}
                              label={permissionLabels.VIEW}
                            />
                          )}
                          {createPermission && (
                            <PermissionCheckbox
                              permission={createPermission}
                              checked={hasPermission(createPermission)}
                              onChange={handlePermissionChange}
                              label={permissionLabels.CREATE}
                            />
                          )}
                          {updatePermission && (
                            <PermissionCheckbox
                              permission={updatePermission}
                              checked={hasPermission(updatePermission)}
                              onChange={handlePermissionChange}
                              label={permissionLabels.UPDATE}
                            />
                          )}
                          {deletePermission && (
                            <PermissionCheckbox
                              permission={deletePermission}
                              checked={hasPermission(deletePermission)}
                              onChange={handlePermissionChange}
                              label={permissionLabels.DELETE}
                            />
                          )}
                        </div>
                      </PermissionGroup>
                    );
                  })}
                </div>
              </PermissionGroup>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RolePermission; 