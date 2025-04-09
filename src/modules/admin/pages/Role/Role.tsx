import { useState } from "react";
import { useRoles, useDeleteRole } from "@/services/queries/useRoleQuery";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Shield } from "lucide-react";
import { type IRole } from "@/types/roleTypes";
import { DEFAULT_QUERY_PAGE } from "@/constants";
import { IQueryParams } from "@/types/commonQuery";
import RoleSearch from "./RoleSearch";
import { useSorting } from "@/hooks/useSorting";
import {
  SortableTable,
  type SortableColumn,
} from "@/components/ui/sortable-table";
import CustomPagination from "@/components/CustomPagination/CustomPagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DeleteConfirmation from "@/components/DeleteConfirmation/DeleteConfirmation";
import AddEditRoleDialog from "@/components/Dialog/AddEditRoleDialog/AddEditRoleDialog";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PERMISSIONS } from "@/constants/permissions";
import { AdminRoutes, getAdminRoutes } from "@/routes/routes";
import { hasPermission } from "@/utils/permission";

const Role = () => {
  const hasDeletePermision = hasPermission([PERMISSIONS.SYSTEM.ROLE.DELETE]);
  const hasEditPermision = hasPermission([PERMISSIONS.SYSTEM.ROLE.UPDATE]);
  const hasAddPermision = hasPermission([PERMISSIONS.SYSTEM.ROLE.CREATE]);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useState<IQueryParams>({
    ...DEFAULT_QUERY_PAGE,
    sortBy: "name",
    sortOrder: "asc",
  });

  const idAmindOrBasicRole = (item: IRole) =>
    item.permissions.includes(PERMISSIONS.ADMIN) ||
    item.permissions.includes(PERMISSIONS.BASIC);

  const { onSort } = useSorting({
    defaultSortBy: queryParams.sortBy,
    defaultSortOrder: queryParams.sortOrder,
    onSortChange: (sortConfig) => {
      setQueryParams((prev) => ({
        ...prev,
        sortBy: sortConfig.sortBy,
        sortOrder: sortConfig.sortOrder,
      }));
    },
  });

  const { data, isLoading } = useRoles({
    ...queryParams,
  });

  const roles = data?.data?.roles || [];
  const totalPage = data?.data?.totalPage || 0;
  const { mutate: deleteRole, isPending: isDeleting } = useDeleteRole();

  const [selectedRole, setSelectedRole] = useState<IRole | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDeleteClick = (role: IRole) => {
    setSelectedRole(role);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (selectedRole) {
      deleteRole(selectedRole._id);
      setDeleteDialogOpen(false);
    }
  };

  const handleSearch = (search: string) => {
    setQueryParams({ ...queryParams, ...DEFAULT_QUERY_PAGE, search });
  };

  const handlePageChange = (page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  };

  const handleAddClick = () => {
    setSelectedRole(null);
    setDialogOpen(true);
  };

  const handleEditClick = (role: IRole) => {
    setSelectedRole(role);
    setDialogOpen(true);
  };

  const handleAssignPermission = (role: IRole) => {
    navigate(getAdminRoutes(`${AdminRoutes.RolePermission}/${role._id}`));
  };

  const columns: SortableColumn<IRole>[] = [
    {
      key: "name",
      label: t("roles.name"),
      sortable: true,
    },
    {
      key: "actions",
      label: t("common.actions"),
      align: "right",
      renderCell: (role) => {
        if (idAmindOrBasicRole(role)) return null;
        return (
          <div className="flex justify-end space-x-2">
            {hasEditPermision && (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleAssignPermission(role)}
                      >
                        <Shield className="h-4 w-4 text-primary" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {t("roles.assignPermissions")}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(role)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t("common.edit")}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}

            {hasDeletePermision && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(role)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{t("common.delete")}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        );
      },
    },
  ];

  const shouldShowPagination = totalPage > 1;

  return (
    <>
      <title>{t("roles.management")}</title>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t("roles.management")}</h1>
          {hasAddPermision && (
            <Button onClick={handleAddClick}>{t("roles.addNew")}</Button>
          )}
        </div>

        <RoleSearch onSearch={handleSearch} />

        <SortableTable<IRole>
          columns={columns}
          data={roles}
          isLoading={isLoading}
          onSort={onSort}
          keyExtractor="_id"
          noDataMessage={t("roles.noRolesFound")}
        />

        {shouldShowPagination && (
          <CustomPagination
            currentPage={queryParams.page}
            totalPages={totalPage}
            onPageChange={handlePageChange}
          />
        )}
        {hasDeletePermision && (
          <DeleteConfirmation
            isOpen={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            onConfirm={handleDelete}
            itemName={selectedRole?.name}
            title={t("roles.deleteRole")}
            isLoading={isDeleting}
          />
        )}

        <AddEditRoleDialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          role={selectedRole}
        />
      </div>
    </>
  );
};

export default Role;
