import { useState } from "react";
import { useRoles, useDeleteRole } from "@/services/queries/useRoleQuery";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { type IRole } from "@/types/roleTypes";
import Loading from "@/components/Loading";
import { DEFAULT_QUERY_PAGE } from "@/constants";
import { IQueryParams } from "@/types/commonQuery";
import RoleSearch from "./RoleSearch";

const Role = () => {
  const [queryParams, setQueryParams] = useState<IQueryParams>({...DEFAULT_QUERY_PAGE});

  const { data, isLoading } = useRoles({ ...queryParams });
  const roles = data?.data?.roles || [];
  console.log(" Role ~ data:", data)
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

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Roles Management</h1>
        <Button>Add New Role</Button>
      </div>

      <RoleSearch onSearch={handleSearch} />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                  <TableCell colSpan={2} className="h-24 text-center">
                    <Loading />
                  </TableCell>
              </TableRow>
            ) : roles.length ? (
              roles.map((role) => (
                <TableRow key={role._id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteClick(role)}
                      >
                        <Trash className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="h-24 text-center">
                  No roles found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Role</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the role "{selectedRole?.name}"? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Role;