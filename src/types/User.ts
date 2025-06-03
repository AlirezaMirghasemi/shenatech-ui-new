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
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  bio: string | null;
  gender: Gender | null;
  mobile: string | null;
  mobile_verified_at: string | null;
  status: UserStatus;
  profile_image: Image | null;
  roles: Role[] | null;
  permissions: Permission[] | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
export interface CreateUser {
  username: string;
  email: string;
  password: string;
  password_confirmation: string | null;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  bio: string | null;
  gender: Gender | null;
  mobile: string | null;
  //mobile_verified_at: string | null;
  status: UserStatus;
  profile_image: Image | null;
  //roles: Role[]|null;
  //permissions: Permission[]|null;
}
