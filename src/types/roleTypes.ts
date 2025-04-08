export interface IRole {
  _id: string;
  name: string;
  permissions: string[];
}

export interface IRoleResponse {
  data: {
    roles: IRole[];
    totalCount: number;
    totalPage: number;
  };
}

export interface IRolePermissionResponse {
  checked: boolean;
  value: string;
  children?: IRolePermissionResponse[];
}

export interface IRolePermissionsResponseFromApi {
  permissions: IRolePermissionResponse[];
  role: IRole;
}

export interface IUpdateRole {
  id: string;
  data: {
    name?: string;
    permissions?: string[];
  };
}

