import { CommonStatus } from "@/constants/data/CommonStatus";
import { Permission } from "./Permission";
import { User } from "./User";

export interface Role {
  id: number;
  name: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  guard_name: string;
  permissions: Permission[];
  users: User[];
  status: CommonStatus;

  created_by: User;
  edited_by: User | null;
  deleted_by: User | null;
  restored_by: User | null;
}
export interface AssignPermission {
  permissionIds: number[];
}
export interface AssignPermissionsToRole {
  roleId: number | "";
  // permissionIds: number[];
}
export interface AssignRoleToUsers {
  userIds: number[];
}
export interface CreateRole {
  name: string;
}
export interface EditRole {
  name: string;
}
