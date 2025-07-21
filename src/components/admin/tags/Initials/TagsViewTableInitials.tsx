"use client";
import { DataStatus } from "@/constants/data/DataStatus";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
import { Tag } from "@/types/Tag";
import { useTag } from "@/hooks/useTag";
import { Dispatch, SetStateAction } from "react";
import {
  CommonStatus,
  CommonStatusTitles,
} from "@/constants/data/CommonStatus";
import { ConvertDateToShamsi } from "@/helpers/ConvertDate";
import { ActionType } from "@/constants/data/ActionsButton";
import { ActionsButtonCommonProps } from "@/components/common/ActionsButtonCommonProps";
import useTable from "@/hooks/useTable";

export default function TagsViewTableInitials({
  tag,
  searchValue,
  ShowTagDetails,
  setTag,
  setEditTagModal,
  setDeleteTagsModal,
  setCreateTagModal,
  setSearchValue,
  searchRef,
  handleTable,
}: {
  tag: Tag | null;
  searchValue: string;
  ShowTagDetails: (row: Tag) => void;
  setTag: (row: Tag) => void;
  setEditTagModal: (row: boolean) => void;
  setDeleteTagsModal: (row: boolean) => void;
  setCreateTagModal: (row: boolean) => void;
  setSearchValue: Dispatch<SetStateAction<string>>;
  searchRef: React.RefObject<HTMLInputElement | null>;
  handleTable: ReturnType<typeof useTable<Tag>>;
}) {
  const { loading, error, meta, tags } = useTag();

  const filteredTags = searchValue
    ? tags.filter((tag) => tag.title.includes(searchValue))
    : tags;
  function onOpenCreateTagModal(): void {
    setCreateTagModal(true);
  }

  function onOpenDeleteTagsModal(rows: Set<number>): void {
    setDeleteTagsModal(true);
    handleTable.handleSelect.setSelectedIds(rows);
  }

  function onOpenEditTagModal(row: Tag) {
    setTag(row);
    setEditTagModal(true);
  }
  const InitialTagsViewTable: IDynamicTable<Tag> = {
    header: {
      title: "هشتگ ها",
      actions: [
        {
          caption: "ایجاد هشتگ",
          name: ActionsButtonCommonProps.getActionButtonProps(ActionType.CREATE)
            .name,
          color: ActionsButtonCommonProps.getActionButtonProps(
            ActionType.CREATE
          ).color,
          handler: onOpenCreateTagModal,
        },
        //TODO: edit dynamic actions correctly
        {
          name: ActionsButtonCommonProps.getActionButtonProps(
            ActionType.DELETES
          ).name,
          caption: "حذف",
          color: ActionsButtonCommonProps.getActionButtonProps(
            ActionType.DELETES
          ).color,
          handler: () => {
            console.log(handleTable.handleSelect.selectedIds);
            onOpenDeleteTagsModal(new Set(handleTable.handleSelect.selectedIds));
          },
          visibility: {
            hiddenOnDeleteStatus: true,
            hiddenOnNoSelection: true,
            disableOnDeleteStatus: true,
            disableOnNoSelection: true,
          },
        },
      ],
    },
    data: filteredTags,
    columns: [
      {
        header: "نام هشتگ",
        accessor: "title",
        className: "text-center",
      },
      {
        header: "وضعیت هشتگ",
        accessor: "status",
        className: "text-center",
        cellRenderer: (row) => {
          return CommonStatusTitles.getCommonStatusTitle(row.status);
        },
      },
      {
        header: "تاریخ ایجاد",
        accessor: "created_at",
        className: "text-center",
        cellRenderer: (row) => {
          return ConvertDateToShamsi({ date: row.created_at });
        },
      },
      {
        header: "حذف شده توسط",
        accessor: "deleted_by",
        className: "text-center",
        roles: ["Admin"],
        permissions: [],
        cellRenderer: (row) => {
          return row.deleted_by?.username ?? "-";
        },
      },
      {
        header: "تاریخ ویرایش",
        accessor: "updated_at",
        className: "text-center",
        cellRenderer: (row) => {
          return row.updated_at
            ? ConvertDateToShamsi({ date: row.updated_at })
            : "-";
        },
      },
      {
        header: "تاریخ حذف",
        accessor: "deleted_at",
        className: "text-center",
        cellRenderer: (row) => {
          return row.deleted_at
            ? ConvertDateToShamsi({ date: row.deleted_at })
            : "-";
        },
      },
    ],
    actions: [
      {
        name: ActionsButtonCommonProps.getActionButtonProps(ActionType.DETAIL)
          .name,
        caption: "مشاهده ی جزییات",
        handler: (row: Tag) => {
          ShowTagDetails(row);
        },
        icon: ActionsButtonCommonProps.getActionButtonProps(ActionType.DETAIL)
          .icon,
        color: ActionsButtonCommonProps.getActionButtonProps(ActionType.DETAIL)
          .color,

        visibility: {
          hiddenOnMultipleSelection: true,
          disableOnMultipleSelection: true,
        },
      },
      {
        name: ActionsButtonCommonProps.getActionButtonProps(ActionType.EDIT)
          .name,
        caption: "ویرایش",
        icon: ActionsButtonCommonProps.getActionButtonProps(ActionType.EDIT)
          .icon,
        color: ActionsButtonCommonProps.getActionButtonProps(ActionType.EDIT)
          .color,
        handler: (row) => {
          onOpenEditTagModal(row);
        },
        visibility: {
          hiddenOnMultipleSelection: true,
          disableOnMultipleSelection: true,
          hiddenOnDeleteStatus: true,
          disableOnDeleteStatus: true,
        },
      },
      {
        name: ActionsButtonCommonProps.getActionButtonProps(ActionType.DELETE)
          .name,
        caption: "حذف",
        icon: ActionsButtonCommonProps.getActionButtonProps(ActionType.DELETE)
          .icon,
        color: "danger",
        handler: (row) => {
          setTag(row);
          onOpenDeleteTagsModal(new Set([row.id]));
        },
        visibility: {
          hiddenOnMultipleSelection: true,
          disableOnMultipleSelection: true,
          hiddenOnDeleteStatus: true,
          disableOnDeleteStatus: true,
        },
      },
      {
        name: ActionsButtonCommonProps.getActionButtonProps(ActionType.RESTORE)
          .name,
        caption: "بازیابی",
        icon: ActionsButtonCommonProps.getActionButtonProps(ActionType.RESTORE)
          .icon,
        color: ActionsButtonCommonProps.getActionButtonProps(ActionType.RESTORE)
          .color,
        handler: (row) => {
          setTag(row);
          //onOpenRestoreTagModal(row.id);
        },
        visibility: {
          hiddenOnMultipleSelection: true,
          disableOnMultipleSelection: true,
        },
        hidden: (row) => row.status !== CommonStatus.DELETED,
        disabled: (row) => row.status !== CommonStatus.DELETED,
      },
    ],
    rowKey: "id",
    error: error?.toString(),
    loading: loading === DataStatus.PENDING,
    pagination: meta,
    actionCellClassName: "text-center",
    searchableTable: {
      searchable: true,
      searchValue: searchValue,
      setSearchValue: setSearchValue,
      searchRef: searchRef,
    },
    checkboxTable: true,
  };
  return InitialTagsViewTable;
}
