export enum Modal {
  "create" = "create",
  "edit" = "edit",
  "edits" = "edits",
  "delete" = "delete",
  "deletes" = "deletes",
  "detail" = "detail",
  "restore" = "restore",
  "restores" = "restores",
  "assign" = "assign",
  "info" = "info",
}
export type ModalType =
  | "create"
  | "edit"
  | "edits"
  | "delete"
  | "deletes"
  | "detail"
  | "restore"
  | "restores"
  | "assign"
  | "info";
export interface ModalData<T extends object> {
  selectedIds?: Set<number>;
  selectedRows?: T[];
  data?: T;
}
