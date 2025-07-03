import { DataStatus } from "@/constants/data/DataStatus";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
import { Tag } from "@/types/Tag";
import { useEffect, useState } from "react";
import { FaEye, FaPen, FaTrashCan } from "react-icons/fa6";
import DynamicTable from "../dynamics/DynamicTable";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import PersianDate from "persian-date";
import { useTag } from "@/hooks/useTag";
export default function TagsViewTable({
  tag,
  setTag,
  ShowTagDetails,
}: {
  tag: Tag | null;
  setTag: (tag: Tag | null) => void;
  ShowTagDetails: (tag: Tag) => void;
}) {
  const {
    tags,
    loading,
    error,
    meta,
    actions: { fetchTags },
  } = useTag();
  const [tagsPage, setTagsPage] = useState("1");

  useEffect(() => {
    const fetchTagsData = async () => {
      await fetchTags(tagsPage, "5");
    };
    fetchTagsData();
  }, [tagsPage]);
  const [createTagModal, setCreateTagModal] = useState(false);
  const [editTagModal, setEditTagModal] = useState(false);
  const [deleteTagModal, setDeleteTagModal] = useState(false);
  function onOpenCreateTagModal() {
    setCreateTagModal(true);
  }
  //   function onCloseCreateTagModal() {
  //     setCreateTagModal(false);
  //     setTag(null);
  //   }
  function onOpenDeleteTagModal(row: Tag) {
    setTag(row);
    setDeleteTagModal(true);
  }
  //   function onCloseDeleteTagModal() {
  //     setDeleteTagModal(false);
  //     setTag(null);
  //   }
  function onOpenEditTagModal(row: Tag) {
    setTag(row);
    setEditTagModal(true);
  }
  //   function onCloseEditTagModal() {
  //     setEditTagModal(false);
  //   }

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
    data: tags ?? [],
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
        className: "!rounded-l-none",
      },

      {
        name: "Edit",
        caption: "ویرایش",
        icon: <FaPen />,
        color: "warning",
        className: "!rounded-none",
        handler: (row) => {
          onOpenEditTagModal(row);
        },
      },
      {
        name: "Delete",
        caption: "حذف",
        icon: <FaTrashCan />,
        color: "danger",
        className: "!rounded-r-none",
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
  };
  return (
    <>
      <DynamicTable dynamicTable={InitialTagsViewTable} setPage={setTagsPage} />
      {/* <CreateTagModal
        createTagModal={createTagModal}
        onCloseCreateTagModal={onCloseCreateTagModal}
      /> */}
      {/* {tag && (
        <>
          <EditTagModal
            editTagModal={editTagModal}
            onCloseEditTagModal={onCloseEditTagModal}
            tag={tag}
          />
          <DeleteTagModal
            deleteTagModal={deleteTagModal}
            tag={tag}
            onCloseDeleteTagModal={onCloseDeleteTagModal}
          />
        </>
      )} */}
    </>
  );
}
