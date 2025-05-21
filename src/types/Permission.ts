import { Actions, Assigned, TableNames } from "@/constants/data/ManagePermissions";

export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
  }
export interface AssignRolePermissions{
    permissionIds: number[];
}
export interface CreatePermission{
permissionName:string;
actionName:Actions | "";
assignedName:Assigned | "";
tableName:TableNames | "";
permissionViewName:string;
}
