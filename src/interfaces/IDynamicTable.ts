import { TextAlignment } from "@/constants/ui/TextAlignment";
import { ReactNode } from "react";
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
  onSearch?: (query: string) => void;
  emptyState?: ReactNode;
  className?: string;
  ariaLabel?: string;
  rowKey: keyof T;
}

export interface IDynamicTableColumn<T extends object> {
  header: string;
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
  caption:string;
  icon: ReactNode;
  handler?: (row: T) => void;
  className?: string;
  disabled?: boolean | ((row: T) => boolean);
  actionRenderer?: (row: T) => ReactNode;
}

export interface IDynamicTableHeader {
  title: string;
  description?: string;
  actions?: IDynamicTableHeaderAction[];
}
export interface IDynamicTableHeaderAction {
    name: string;
  caption:string;
  icon?: ReactNode;
  handler:()=>void;
  className?: string;
  disabled?: boolean;

}
