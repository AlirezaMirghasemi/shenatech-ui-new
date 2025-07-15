import { TextAlignment } from "@/constants/ui/TextAlignment";
import {  ReactNode, Ref } from "react";
import { PaginatedResponse } from "@/types/Api";

export interface IDynamicTable<T extends object> {
  header?: IDynamicTableHeader;
  data: T[];
  columns: IDynamicTableColumn<T>[];
  actions?: IDynamicTableAction<T>[];
  pagination?: PaginatedResponse<T>;
  loading?: boolean;
  error?: string | null;
  onSort?: (column: keyof T, direction: "asc" | "desc") => void;
  emptyState?: ReactNode;
  className?: (row: T) => string;
  ariaLabel?: string;
  rowKey: keyof T;
  actionCellClassName?: string;
  checkboxTable?: ICheckBoxTable;
  searchableTable?: ISearchableTable;
}
export interface ISearchableTable {
  searchable: boolean;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchRef: Ref<HTMLInputElement> | undefined ;
}
export interface ICheckBoxTable {
  selectedIds: Set<number>;
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<number>>>;
}
export interface IDynamicTableColumn<T extends object> {
  header: string;
  HeadCellClassName?: string;
  accessor: keyof T;
  width?: string;
  align?: TextAlignment;
  cellRenderer?: (row: T) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  ariaLabel?: string;
  className?: string;
}

export interface IDynamicTableAction<T extends object> {
  name: string;
  caption: string;
  icon: ReactNode;
  color?: string;
  handler?: (row: T) => void;
  className?: string;
  disabled?: boolean|((row:T) => boolean);
  hidden?: boolean|((row:T) => boolean);
  actionRenderer?: (row: T) => ReactNode;
}

export interface IDynamicTableHeader {
  title: string;
  description?: string;
  actions?: IDynamicTableHeaderAction[];
}
export interface IDynamicTableHeaderAction {
  name: string;
  caption: string;
  icon?: ReactNode;
  handler: () => void;
  className?: string;
  disabled?: boolean;
  color?: string;
}
