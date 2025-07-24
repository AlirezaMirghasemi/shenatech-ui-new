import { IDynamicTable } from "@/interfaces/IDynamicTable";
import { Tag } from "@/types/Tag";
import { ConvertDateToShamsi } from "@/helpers/ConvertDate";
import { CommonStatusTitles } from "@/constants/data/CommonStatus";
import { ActionConfig, ActionContext } from "@/utils/ActionRegistry";
import { ActionType } from "@/constants/data/ActionsButton";
import { PaginatedResponse } from "@/types/Api";
import { SetStateAction, useMemo } from "react";
import { tagActions } from "./TagsViewTableActions";

interface Props {
  searchValue: string;
  setSearchValue: (value: SetStateAction<string>) => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
  tags: Tag[];
  meta: PaginatedResponse<Tag>;
  loading: boolean;
  error: { message: string } | null;
  actionContext: ActionContext<Tag>;
}

export default function TagsViewTableInitials({
  searchValue,
  setSearchValue,
  searchRef,
  tags,
  meta,
  loading,
  error,
  actionContext,
}: Props): IDynamicTable<Tag> {
  const headerActions = useMemo(() => {
    return [
      tagActions.getAction(ActionType.CREATE),
      tagActions.getAction(ActionType.DELETES),
      tagActions.getAction(ActionType.RESTORES),
    ].filter(Boolean) as ActionConfig<Tag>[];
  }, []);

  return {
    header: {
      title: "هشتگ ها",
      description: "مدیریت هشتگ ها",
      actions: headerActions,
    },
    data: tags,
    columns: [
      {
        header: "نام هشتگ",
        accessor: "title",
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
    getRowActions: (row: Tag) =>
      tagActions.getVisibleActions(row, actionContext),
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
