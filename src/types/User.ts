import { Gender } from "@/constants/data/Gender";
import { Image } from "./Image";
import { UserStatus } from "@/constants/data/UserStatus";

export interface User {
  id: number;
  username: string;
  email: string;
  email_verified_at: string;
  first_name: string | "";
  last_name: string | "";
  full_name: string | "";
  bio: string | "";
  gender: Gender | "";
  mobile: string | "";
  mobile_verified_at: string | "";
  status: UserStatus;
  profile_image: Image | File | "";
  role_names: string[] | [];
  permission_names: string[] | [];
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  created_by: User;
  edited_by: User | null;
  deleted_by: User | null;
  restored_by: User | null;
}
export interface CreateUser {
  username: string;
  email: string;
  password: string;
  password_confirmation: string | null;
  first_name: string | null;
  last_name: string | null;
  full_name: string | undefined;
  bio: string | null;
  gender: Gender | null;
  mobile: string | null;
  status: UserStatus;
  profile_image: File | null;
}
export interface EditUserStatus {
  status: UserStatus;
}
export interface EditUser {
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  full_name: string | undefined;
  bio: string | null;
  gender: Gender | null;
  mobile: string | null;
  status: UserStatus;
  profile_image: File | null;
}

export interface DeleteUser {
  userId: number;
  removeProfilePicture: boolean;
  removeRoles: boolean;
}
export interface AssignRolesToUser{
    roleIds:number[];
}
