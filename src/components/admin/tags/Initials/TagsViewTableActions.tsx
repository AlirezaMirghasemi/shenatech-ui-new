// src/app/tags/components/TagsViewTableActions.ts
import { ActionType } from "@/constants/data/ActionsButton";
import { Color } from "@/constants/data/Color";
import { CommonStatus } from "@/constants/data/CommonStatus";
import { ModalType } from "@/constants/data/Modal";
import { Tag } from "@/types/Tag";
import { ActionRegistry } from "@/utils/ActionRegistry";
import { FaEye, FaPen, FaRecycle, FaTrashCan } from "react-icons/fa6";

export const TagsViewTableActions = new ActionRegistry<Tag>()
  .register({
    id: ActionType.commonModalAction.create,
    label: "ایجاد هشتگ",
    color: Color.success,
    visibility: {
      hidden: (item, { selectedIds }) => item !== null || selectedIds.size != 0,
    },
    handler: (_, { openModal }) =>
      openModal(ModalType.commonModalType.create, {}),
  })
  .register({
    id: ActionType.commonModalAction.detail,
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
        openModal(ModalType.commonModalType.detail, {
          selectedIds: new Set([tag.id]),
        });
      }
    },
  })
  .register({
    id: ActionType.commonModalAction.edit,
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
        openModal(ModalType.commonModalType.edit, {
          selectedIds: new Set([tag.id]),
          selectedRows: [tag],
        });
      }
    },
  })
  .register({
    id: ActionType.commonModalAction.delete,
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
        openModal(ModalType.commonModalType.delete, {
          selectedIds: new Set([tag.id]),
          selectedRows: [tag],
        });
      }
    },
  })
  .register({
    id: ActionType.commonModalAction.deletes,
    label: "حذف هشتگ ها",
    color: Color.danger,
    visibility: {
      hidden: (item, { selectedIds, selectedRows }) =>
        item !== null ||
        selectedIds.size === 0 ||
        selectedRows.some((tag) => tag.status === CommonStatus.DELETED),
    },
    handler: (_, { openModal, selectedIds, selectedRows }) => {
      openModal(ModalType.commonModalType.deletes, {
        selectedIds,
        selectedRows,
      });
    },
  })
  .register({
    id: ActionType.commonModalAction.restore,
    label: "بازیابی",
    icon: <FaRecycle />,
    color: Color.warning,
    visibility: {
      hidden: (tag, { selectedIds }) =>
        tag === null ||
        tag.status !== CommonStatus.DELETED ||
        selectedIds.size != 0,
    },
    handler: (tag, { setSelectedIds, setSelectedRows, openModal }) => {
      if (tag) {
        setSelectedIds(new Set([tag.id]));
        setSelectedRows([tag]);
        openModal(ModalType.commonModalType.restore, {
          selectedIds: new Set([tag.id]),
          selectedRows: [tag],
        });
      }
    },
  })
  .register({
    id: ActionType.commonModalAction.restores,
    label: "بازیابی هشتگ ها",
    color: Color.warning,
    visibility: {
      hidden: (item, { selectedIds, selectedRows }) =>
        item !== null || // فقط در هدر نمایش داده شود
        selectedIds.size === 0 ||
        selectedRows.some((tag) => tag.status !== CommonStatus.DELETED),
    },
    handler: (_, { openModal, selectedIds, selectedRows }) => {
      openModal(ModalType.commonModalType.restores, {
        selectedIds,
        selectedRows,
      });
    },
  });
