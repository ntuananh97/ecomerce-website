import React from "react";
import PermissionCheckbox from "./PermissionCheckbox";
import PermissionGroup from "./PermissionGroup";
import { IRolePermissionResponse } from "@/types/roleTypes";
import { useTranslation } from "react-i18next";
const getPermissionLabel = (permission: string) => {
  const permissionArr = permission.split(".");
  return permissionArr[permissionArr.length - 1];
};

interface PermissionItemProps {
  item: IRolePermissionResponse;
  selectedPermissions?: string[];
  setSelectedPermissions?: (permission: string) => void;
}

const WrapperCheckbox = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {children}
  </div>
);

const PermissionItem: React.FC<PermissionItemProps> = ({
  item,
  selectedPermissions = [],
  setSelectedPermissions,
}) => {
  const { t } = useTranslation();
  const itemChildren = item.children || [];
  const childrenIsLeaf = itemChildren.some(
    (child) => !child.children && child.checked !== undefined
  );

  const isLeaf = item.checked !== undefined && !item.children;
  const hasPermission = (permissionValue: string): boolean => {
    return selectedPermissions.includes(permissionValue);
  };

  return (
    <PermissionGroup key={item.value} title={item.value} isParent={true}>
      <div className="space-y-4">
        {!isLeaf ? (
          <>
            {!childrenIsLeaf ? (
              itemChildren.map((childItem) => {
                return (
                  <PermissionItem
                    key={childItem.value}
                    item={childItem}
                    selectedPermissions={selectedPermissions}
                    setSelectedPermissions={setSelectedPermissions}
                  />
                );
              })
            ) : (
              <WrapperCheckbox>
                {itemChildren.map((childItem) => {
                  return (
                    <PermissionCheckbox
                      key={childItem.value}
                      permission={childItem.value}
                      checked={hasPermission(childItem.value)}
                      onChange={() => setSelectedPermissions?.(childItem.value)}
                      label={t(getPermissionLabel(childItem.value))}
                    />
                  );
                })}
              </WrapperCheckbox>
            )}
         
          </>
        ) : (
          <WrapperCheckbox>
            <PermissionCheckbox
              key={item.value}
              permission={item.value}
              checked={hasPermission(item.value)}
              onChange={() => setSelectedPermissions?.(item.value)}
              label={t(getPermissionLabel(item.value))}
            />
          </WrapperCheckbox>
        )}
      </div>
    </PermissionGroup>
  );
};

export default React.memo(PermissionItem);
