"use client";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
import { SetStateAction, useMemo } from "react";

import { PaginatedResponse } from "@/types/Api";
import { ActionConfig, ActionContext } from "@/utils/ActionRegistry";
import { ActionType } from "@/constants/data/ActionsButton";
import { ConvertDateToShamsi } from "@/helpers/ConvertDate";
import { Role } from "@/types/Role";
import {
  CommonStatus,
  CommonStatusTitles,
} from "@/constants/data/CommonStatus";
import { UserRolesTableActions } from "./UserRolesTableActions";
interface Props {
  searchValue: string;
  setSearchValue: (value: SetStateAction<string>) => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
  userRoles: Role[];
  meta: PaginatedResponse<Role>;
  loading: boolean;
  error: { message: string } | null;
  actionContext: ActionContext<Role>;
}
export default function UserRolesTableInitials({
  searchValue,
  setSearchValue,
  searchRef,
  userRoles,
  meta,
  loading,
  error,
  actionContext,
}: Props): IDynamicTable<Role> {
  const headerActions = useMemo(() => {
    return [
      UserRolesTableActions.getAction(
        ActionType.userRoleModalAction.assignRoles
      ),
    ].filter(Boolean) as ActionConfig<Role>[];
  }, [actionContext]);

  return {
    header: {
      title: "نقش های کاربر",
      actions: headerActions,
    },
    data: userRoles,
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
        cellRenderer(row) {
          const status = CommonStatusTitles.getCommonStatusTitle(row.status);
          switch (row.status) {
            case CommonStatus.ACTIVE:
              return <span className="text-success">{status}</span>;
            case CommonStatus.DELETED:
              return <span className="text-danger">{status}</span>;
            default:
              return null;
          }
        },
      },

      {
        header: "تاریخ ایجاد",
        accessor: "created_at",
        className: "text-center",
        cellRenderer: (row) => ConvertDateToShamsi({ date: row.created_at }),
      },
      {
        header: "تاریخ ویرایش",
        accessor: "updated_at",
        className: "text-center",
        cellRenderer: (row) =>
          row.updated_at ? ConvertDateToShamsi({ date: row.updated_at }) : "-",
      },
      {
        header: "حذف شده توسط",
        accessor: "deleted_by",
        className: "text-center",
        roles: ["Admin"],
        cellRenderer: (row) => row.deleted_by?.username ?? "-",
      },
      {
        header: "تاریخ حذف",
        accessor: "deleted_at",
        className: "text-center",
        cellRenderer: (row) =>
          row.deleted_at ? ConvertDateToShamsi({ date: row.deleted_at }) : "-",
      },
    ],

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
