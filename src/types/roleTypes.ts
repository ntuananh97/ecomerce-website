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


