// src/app/tags/components/TagsViewTableActions.ts
import { ActionType } from "@/constants/data/ActionsButton";
import { Color } from "@/constants/data/Color";
import { CommonStatus } from "@/constants/data/CommonStatus";
import { Modal } from "@/constants/data/ModalType";
import { Tag } from "@/types/Tag";
import { ActionRegistry } from "@/utils/ActionRegistry";
import { FaEye, FaPen, FaRecycle, FaTrashCan } from "react-icons/fa6";

export const tagActions = new ActionRegistry<Tag>()
  .register({
    id: ActionType.CREATE,
    label: "ایجاد هشتگ",
    color: Color.success,
    visibility: {
      hidden: (item,{selectedIds}) => (item !== null)||selectedIds.size!=0, // فقط در هدر نمایش داده شود
    },
    handler: (_, { openModal }) => openModal(Modal.create, {}),
  })
  .register({
    id: ActionType.DETAIL,
    label: "مشاهده جزئیات",
    icon: <FaEye />,
    color: Color.info,
    visibility: {
      hidden: (tag, { selectedIds }) =>
        tag === null ||
        tag.status === CommonStatus.DELETED ||
        selectedIds.size !== 0,
    },
    handler: (tag, { setSelectedIds, setSelectedRows, openModal }) => {
      if (tag) {
        setSelectedIds(new Set([tag.id]));
        setSelectedRows([tag]);
        openModal(Modal.detail, { selectedIds: new Set([tag.id]) });
      }
    },
  })
  .register({
    id: ActionType.EDIT,
    label: "ویرایش",
    icon: <FaPen />,
    color: Color.warning,
    visibility: {
      hidden: (tag, { selectedIds }) =>
        tag === null ||
        tag.status === CommonStatus.DELETED ||
        selectedIds.size !== 0,
    },
    handler: (tag, { setSelectedIds, setSelectedRows, openModal }) => {
      if (tag) {
        setSelectedIds(new Set([tag.id]));
        setSelectedRows([tag]);
        openModal(Modal.edit, {
          selectedIds: new Set([tag.id]),
          selectedRows: [tag],
        });
      }
    },
  })
  .register({
    id: ActionType.DELETE,
    label: "حذف",
    icon: <FaTrashCan />,
    color: Color.danger,
    visibility: {
      hidden: (tag, { selectedIds }) =>
        tag === null ||
        tag.status === CommonStatus.DELETED ||
        selectedIds.size !== 0,
    },
    handler: (tag, { setSelectedIds, setSelectedRows, openModal }) => {
      if (tag) {
        setSelectedIds(new Set([tag.id]));
        setSelectedRows([tag]);
        openModal(Modal.delete, {
          selectedIds: new Set([tag.id]),
          selectedRows: [tag],
        });
      }
    },
  })
  .register({
    id: ActionType.DELETES,
    label: "حذف هشتگ ها",
    color: Color.danger,
    visibility: {
      hidden: (item, { selectedIds, selectedRows }) =>
        item !== null ||
        selectedIds.size === 0 ||
        selectedRows.some((tag) => tag.status === CommonStatus.DELETED),
    },
    handler: (_, { openModal, selectedIds, selectedRows }) => {
      openModal(Modal.delete, { selectedIds, selectedRows });
    },
  })
  .register({
    id: ActionType.RESTORE,
    label: "بازیابی",
    icon: <FaRecycle />,
    color: Color.warning,
    visibility: {
      hidden: (tag) => tag === null || tag.status !== CommonStatus.DELETED,
    },
    handler: (tag, { setSelectedIds, setSelectedRows, openModal }) => {
      if (tag) {
        setSelectedIds(new Set([tag.id]));
        setSelectedRows([tag]);
        openModal(Modal.restore, {
          selectedIds: new Set([tag.id]),
          selectedRows: [tag],
        });
      }
    },
  })
  .register({
    id: ActionType.RESTORES,
    label: "بازیابی هشتگ ها",
    color: Color.warning,
    visibility: {
      hidden: (item, { selectedIds, selectedRows }) =>
        item !== null || // فقط در هدر نمایش داده شود
        selectedIds.size === 0 ||
        selectedRows.some((tag) => tag.status !== CommonStatus.DELETED),
    },
    handler: (_, { openModal, selectedIds, selectedRows }) => {
      openModal(Modal.restore, { selectedIds, selectedRows });
    },
  });
