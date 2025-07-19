"use client";
import { DataStatus } from "@/constants/data/DataStatus";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
import { Tag } from "@/types/Tag";
import { FaEye, FaPen, FaRecycle, FaTrashCan } from "react-icons/fa6";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import PersianDate from "persian-date";
import { useTag } from "@/hooks/useTag";
import { Dispatch, SetStateAction } from "react";
import {
  CommonStatus,
  CommonStatusTitles,
} from "@/constants/data/CommonStatus";

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
  selectedIds,
  setSelectedIds,
  selectedRows,
  setSelectedRows,
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
  selectedIds: Set<number>;
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<number>>>;
  selectedRows: Tag[];
  setSelectedRows: React.Dispatch<React.SetStateAction<Tag[]>>;
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
    setSelectedIds(rows);
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
          name: "Create",
          caption: "ایجاد هشتگ",
          color: "success",
          handler: onOpenCreateTagModal,
        },
        //TODO: edit dynamic actions correctly
        {
          name: "Delete",
          caption: "حذف",
          color: "danger",
          handler: () => {
            onOpenDeleteTagsModal(new Set(selectedIds));
          },
          hidden: () =>
            selectedIds.size === 0 ||
            selectedRows.filter((row) => row.status === CommonStatus.DELETED)
              .length > 0,
          disabled: () =>
            selectedIds.size === 0 ||
            selectedRows.filter((row) => row.status === CommonStatus.DELETED)
              .length > 0,
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
          const date = new PersianDate(new Date(row.created_at)).format(
            "HH:mm:ss - YYYY/MM/DD"
          );
          return date;
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
          const date = row.updated_at
            ? new PersianDate(new Date(row.updated_at)).format(
                "HH:mm:ss - YYYY/MM/DD"
              )
            : "-";
          return date;
        },
      },
    ],
    actions: [
      {
        name: "ShowTagDetails",
        caption: "مشاهده ی جزییات",
        handler: (row: Tag) => {
          ShowTagDetails(row);
        },
        icon: <FaEye />,
        color: "info",
      },

      {
        name: "Edit",
        caption: "ویرایش",
        icon: <FaPen />,
        color: "warning",
        handler: (row) => {
          onOpenEditTagModal(row);
        },
        hidden: (row) => row.status === CommonStatus.DELETED,
        disabled: (row) => row.status === CommonStatus.DELETED,
      },
      {
        name: "Delete",
        caption: "حذف",
        icon: <FaTrashCan />,
        color: "danger",
        handler: (row) => {
          setTag(row);
          onOpenDeleteTagsModal(new Set([row.id]));
        },
        hidden: (row) => row.status === CommonStatus.DELETED,
        disabled: (row) => row.status === CommonStatus.DELETED,
      },
      {
        name: "Restore",
        caption: "بازیابی",
        icon: <FaRecycle />,
        color: "warning",
        handler: (row) => {
          setTag(row);
          //onOpenRestoreTagModal(row.id);
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
    className: (row) => (row.id === tag?.id ? "!bg-bg-active " : ""),
    searchableTable: {
      searchable: true,
      searchValue: searchValue,
      setSearchValue: setSearchValue,
      searchRef: searchRef,
    },
    checkboxTable: {
      selectedIds: selectedIds,
      setSelectedIds: setSelectedIds,
      setSelectedRows: setSelectedRows,
    },
  };
  return InitialTagsViewTable;
}
