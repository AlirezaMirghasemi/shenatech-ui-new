import { IDynamicTable } from "@/interfaces/IDynamicTable";
import { ConvertDateToShamsi } from "@/helpers/ConvertDate";
import { CommonStatusTitles } from "@/constants/data/CommonStatus";
import { ActionConfig, ActionContext } from "@/utils/ActionRegistry";
import { ActionType } from "@/constants/data/ActionsButton";
import { PaginatedResponse } from "@/types/Api";
import { SetStateAction, useMemo } from "react";
import { Role } from "@/types/Role";
import { RoleViewTableActions } from "./RoleViewTableActions";

interface Props {
  searchValue: string;
  setSearchValue: (value: SetStateAction<string>) => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
  roles: Role[];
  meta: PaginatedResponse<Role>;
  loading: boolean;
  error: { message: string } | null;
  actionContext: ActionContext<Role>;
}

export default function RolesViewTableInitials({
  searchValue,
  setSearchValue,
  searchRef,
  roles,
  meta,
  loading,
  error,
  actionContext,
}: Props): IDynamicTable<Role> {
  const headerActions = useMemo(() => {
    return [
      RoleViewTableActions.getAction(ActionType.commonModalAction.create),
      RoleViewTableActions.getAction(ActionType.commonModalAction.restores),
    ].filter(Boolean) as ActionConfig<Role>[];
  }, []);

  return {
    header: {
      title: "نقش ها",
      description: "مدیریت تقش ها",
      actions: headerActions,
    },
    data: roles,
    columns: [
      {
        header: "نام نقش",
        accessor: "name",
        className: "text-center",
      },
      {
        header: "وضعیت",
        accessor: "status",
        className: "text-center",
        cellRenderer: (row) =>
          CommonStatusTitles.getCommonStatusTitle(row.status),
      },
      {
        header: "تاریخ ایجاد",
        accessor: "created_at",
        className: "text-center",
        cellRenderer: (row) => ConvertDateToShamsi({ date: row.created_at }),
      },
      {
        header: "حذف شده توسط",
        accessor: "deleted_by",
        className: "text-center",
        roles: ["Admin"],
        cellRenderer: (row) => row.deleted_by?.username ?? "-",
      },
      {
        header: "تاریخ ویرایش",
        accessor: "updated_at",
        className: "text-center",
        cellRenderer: (row) =>
          row.updated_at ? ConvertDateToShamsi({ date: row.updated_at }) : "-",
      },
      {
        header: "تاریخ حذف",
        accessor: "deleted_at",
        className: "text-center",
        cellRenderer: (row) =>
          row.deleted_at ? ConvertDateToShamsi({ date: row.deleted_at }) : "-",
      },
    ],
    getRowActions: (row: Role) =>
      RoleViewTableActions.getVisibleActions(row, actionContext),
    rowKey: "id",
    error: error?.message,
    loading,
    pagination: meta,
    actionCellClassName: "text-center",
    searchableTable: {
      searchable: true,
      searchValue,
      setSearchValue,
      searchRef,
    },
    checkboxTable: true,
  };
}
