import { IUser } from "./userTypes";

export interface IRegisterFormValues {
  email: string;
  password: string;
}

export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface IAuthResponse {
  data: {
    access_token: string;
    refresh_token: string;
    user: IUser;
  };
}


