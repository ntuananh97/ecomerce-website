import { IRole } from "./roleTypes";

export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: IRole;
  phoneNumber: string;
  city: string
}


