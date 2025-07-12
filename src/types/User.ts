import { Gender } from "@/constants/data/Gender";
import { Permission } from "./Permission";
import { Image } from "./Image";
import { UserStatus } from "@/constants/data/UserStatus";
import { Role } from "./Role";

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
  roles: Role[] | "";
  permissions: Permission[] | "";
  created_at: string;
  updated_at: string;
  deleted_at: string | "";
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
  //mobile_verified_at: string | "";
  status: UserStatus;
  profile_image: File | null;
  //roles: Role[]|"";
  //permissions: Permission[]|"";
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
