// export enum ActionType {
//   CREATE = "create",
//   EDIT = "edit",
//   EDITS = "edits",
//   RESTORE = "restore",
//   RESTORES = "restores",
//   DETAIL = "detail",
//   DETAILS = "details",
//   INFO = "info",
//   DELETE = "delete",
//   DELETES = "deletes",

//   ASSIGN = "assign",
//   ASSIGNS = "assigns",
//   UNASSIGN = "unassign",

//   SEARCH = "search",

//   CHANGE_STATUS = "changStatus",
// }

export const ActionType = {
  CommonActionType: {
    CREATE: "create",
    EDIT: "edit",
    EDITS: "edits",
    RESTORE: "restore",
    RESTORES: "restores",
    DETAIL: "detail",
    DETAILS: "details",
    INFO: "info",
    DELETE: "delete",
    DELETES: "deletes",
  },
  UserActionType: {
    CHANGE_STATUS: "changeStatus",
  },
  RoleActionType: {
    ASSIGN_PERMISSION: "assignPermission",
    ASSIGN_USER:"assignUser"
  },
};
type DeepValueOf<T> = T extends object
  ? { [K in keyof T]: DeepValueOf<T[K]> }[keyof T]
  : T;

export type ActionType = DeepValueOf<typeof ActionType>;
