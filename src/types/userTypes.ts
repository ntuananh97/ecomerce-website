export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: {
    _id: string;
    name: string;
  };
  phoneNumber: string;
  city: string
}


