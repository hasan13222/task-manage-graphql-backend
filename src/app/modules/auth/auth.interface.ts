
export interface TUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  profile_picture?: string;
}

export type TUserLoginDetails = {
  email: string;
  password: string;
};

export interface TChangePassword {
    email: string;
    oldPassword: string;
    newPassword: string;
}