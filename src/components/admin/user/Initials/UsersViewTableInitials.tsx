"use client";
import { UserStatus, UserStatusTitles } from "@/constants/data/UserStatus";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
import { User } from "@/types/User";
import {  SetStateAction, useMemo } from "react";

import { PaginatedResponse } from "@/types/Api";
import { ActionConfig, ActionContext } from "@/utils/ActionRegistry";
import { ActionType } from "@/constants/data/ActionsButton";
import { userAction } from "./UserViewTableActions";
import { ConvertDateToShamsi } from "@/helpers/ConvertDate";
interface Props {
  searchValue: string;
  setSearchValue: (value: SetStateAction<string>) => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
  users: User[];
  meta: PaginatedResponse<User>;
  loading: boolean;
  error: { message: string } | null;
  actionContext: ActionContext<User>;
}
export default function UsersViewTableInitials({
  searchValue,
  setSearchValue,
  searchRef,
  users,
  meta,
  loading,
  error,
  actionContext,
}: Props): IDynamicTable<User> {
  const headerActions = useMemo(() => {
    return [
      userAction.getAction(ActionType.CREATE),
      userAction.getAction(ActionType.DELETES),
      userAction.getAction(ActionType.RESTORES),
    ].filter(Boolean) as ActionConfig<User>[];
  }, []);

  return {
    header: {
      title: "کاربران",
      actions: headerActions,
    },
    data: users,
    columns: [
      {
        header: "نام کاربری",
        accessor: "username",
        className: "text-center",
      },
      {
        header: "ایمیل",
        accessor: "email",
        className: "text-center",
      },
      {
        header: "وضعیت",
        accessor: "status",
        className: "text-center",
        cellRenderer(row) {
          const status = UserStatusTitles.getUserStatusTitle(row.status);
          switch (row.status) {
            case UserStatus.ACTIVE:
              return <span className="text-success">{status}</span>;
            case UserStatus.DEACTIVATED:
              return <span className="text-danger">{status}</span>;
            case UserStatus.SUSPENDED:
              return <span className="text-warning">{status}</span>;
            case UserStatus.PENDING:
              return <span className="text-info">{status}</span>;
            case UserStatus.DELETED:
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
    getRowActions: (row: User) =>
      userAction.getVisibleActions(row, actionContext),
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
