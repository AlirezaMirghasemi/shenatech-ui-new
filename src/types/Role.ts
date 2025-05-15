import { Permission } from "./Permission";
import { User } from "./User";

export interface Role {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  permissions: Permission[];
  users: User[];
}
export interface AssignPermission {
  permissionIds: number[];
}
export interface CreateRole {
  roleName: string;
}
export interface EditRole {
  roleName: string;
}
