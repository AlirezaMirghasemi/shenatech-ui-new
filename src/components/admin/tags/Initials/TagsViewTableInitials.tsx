"use client";
import { DataStatus } from "@/constants/data/DataStatus";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
import { Tag } from "@/types/Tag";
import { FaEye, FaPen, FaTrashCan } from "react-icons/fa6";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import PersianDate from "persian-date";
import { useTag } from "@/hooks/useTag";
import { Dispatch, SetStateAction, useState } from "react";

export default function TagsViewTableInitials({
  tag,
  searchValue,
  ShowTagDetails,
  setTag,
  setEditTagModal,
  setDeleteTagModal,
  setCreateTagModal,
  setSearchValue,
  searchRef,
}: {
  tag: Tag|null;
  searchValue: string;
  ShowTagDetails: (row: Tag) => void;
  setTag: (row: Tag) => void;
  setEditTagModal: (row: boolean) => void;
  setDeleteTagModal: (row: boolean) => void;
  setCreateTagModal: (row: boolean) => void;
  setSearchValue: Dispatch<SetStateAction<string>>;
  searchRef: React.RefObject<HTMLInputElement|null>;
}) {
  const { loading, error, meta, tags } = useTag();
  const[selectedIds, setSelectedIds] = useState<Set<number>>(new Set([]));

  const filteredTags = searchValue
    ? tags.filter((tag) => tag.title.includes(searchValue))
    : tags;
  function onOpenCreateTagModal() {
    setCreateTagModal(true);
  }

  function onOpenDeleteTagModal(row: Tag) {
    setTag(row);
    setDeleteTagModal(true);
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
          handler: () => {
            onOpenCreateTagModal();
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
        header: "تاریخ ویرایش",
        accessor: "updated_at",
        className: "text-center",
        cellRenderer: (row) => {
          const date = new PersianDate(new Date(row.updated_at)).format(
            "HH:mm:ss - YYYY/MM/DD"
          );
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
      },
      {
        name: "Delete",
        caption: "حذف",
        icon: <FaTrashCan />,
        color: "danger",
        handler: (row) => {
          onOpenDeleteTagModal(row);
        },
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
    checkboxTable:{
        selectedIds: selectedIds,
        setSelectedIds: setSelectedIds,
    }
  };
  return InitialTagsViewTable;
}
