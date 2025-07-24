import { TextAlignment } from "@/constants/ui/TextAlignment";
import {  ReactNode, Ref } from "react";
import { PaginatedResponse } from "@/types/Api";
import { ActionConfig, ActionContext } from "@/utils/ActionRegistry";

export interface IDynamicTable<T extends object> {
  header?: IDynamicTableHeader<T>;
  data: T[];
  columns: IDynamicTableColumn<T>[];
  getRowActions?: (row: T) => ActionConfig<T>[];
  pagination?: PaginatedResponse<T>;
  loading?: boolean;
  error?: string | null;
  onSort?: (column: keyof T, direction: "asc" | "desc") => void;
  emptyState?: ReactNode;
  className?: (row: T) => string;
  ariaLabel?: string;
  rowKey: keyof T;
  actionCellClassName?: string;
  checkboxTable?: boolean;
  searchableTable?: ISearchableTable;
}

export interface ISearchableTable {
  searchable: boolean;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchRef: Ref<HTMLInputElement> | undefined;
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
  roles?: string[];
  permissions?: string[];
}

export interface IDynamicTableHeader<T extends object> {
  title: string;
  description?: string;
  actions?: ActionConfig<T>[];
}

export interface IDynamicTableActionCellProps<T extends object> {
  item: T;
  actions: ActionConfig<T>[];
  context: ActionContext<T>;
}
