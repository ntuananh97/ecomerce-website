export enum Routes {
  Home = '/',
}

export enum AdminRoutes {
  Admin = '/admin',
  Dashboard = 'dashboard',
  MyProfile = 'my-profile',
  Role = 'roles',
  RolePermission = 'roles/permissions/:id',
  Unauthorized = 'unauthorized',
}

export enum AuthRoutes {
  Auth = '/auth',
  Login = 'login',
  Register = 'register',
}


export const getAdminRoutes = (route: string) => `${AdminRoutes.Admin}/${route}`;

export const getAuthRoutes = (route: string) => `${AuthRoutes.Auth}/${route}`;



