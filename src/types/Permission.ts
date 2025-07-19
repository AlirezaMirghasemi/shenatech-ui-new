import {
  Actions,
  Assigned,
  TableNames,
} from "@/constants/data/ManagePermissions";
import { User } from "./User";

export interface Permission {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  created_by: User;
  edited_by: User | null;
  deleted_by: User | null;
  restored_by: User | null;
}
export interface AssignRolePermissions {
  permissionIds: number[];
}

export interface CreatePermission {
  permissionName: string;
  actionName: Actions | "";
  assignedName: Assigned | "";
  tableName: TableNames | "";
  permissionViewName?: string;
}
