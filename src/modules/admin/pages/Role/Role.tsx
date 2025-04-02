import { useState } from "react";
import { useRoles, useDeleteRole } from "@/services/queries/useRoleQuery";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
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

const Role = () => {
  const [queryParams, setQueryParams] = useState<IQueryParams>({
    ...DEFAULT_QUERY_PAGE,
    sortBy: "name",
    sortOrder: "asc",
  });

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
  const { mutate: deleteRole } = useDeleteRole();

  const [selectedRole, setSelectedRole] = useState<IRole | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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

  const columns: SortableColumn<IRole>[] = [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      renderCell: (role) => (
        <div className="flex justify-end space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ];

  const shouldShowPagination = totalPage > 1;

  return (
    <>
      <title>Roles Management</title>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Roles Management</h1>
          <Button>Add New Role</Button>
        </div>

        <RoleSearch onSearch={handleSearch} />

        <SortableTable<IRole>
          columns={columns}
          data={roles}
          isLoading={isLoading}
          onSort={onSort}
          keyExtractor="_id"
          noDataMessage="No roles found"
        />

        {shouldShowPagination && (
          <CustomPagination
            currentPage={queryParams.page}
            totalPages={totalPage}
            onPageChange={handlePageChange}
          />
        )}

        <DeleteConfirmation
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          itemName={selectedRole?.name}
          title="Delete Role"
        />
      </div>
    </>
  );
};

export default Role;
