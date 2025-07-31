import { ActionType } from "@/constants/data/ActionsButton";
import { Color } from "@/constants/data/Color";
import { CommonStatus } from "@/constants/data/CommonStatus";
import {  ModalType } from "@/constants/data/Modal";
import { Role } from "@/types/Role";
import { ActionRegistry } from "@/utils/ActionRegistry";
import {
  FaEye,
  FaPen,
  FaRecycle,
  FaTrashCan,
  FaUserPen,
  FaUserPlus,
} from "react-icons/fa6";

export const RoleViewTableActions = new ActionRegistry<Role>()
  .register({
    id: ActionType.commonModalAction.create,
    label: "ایجاد نقش",
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
      hidden: (role, { selectedIds }) =>
        role === null ||
        role.status === CommonStatus.DELETED ||
        selectedIds.size !== 0,
    },
    handler: (role, { setSelectedIds, setSelectedRows, openModal }) => {
      if (role) {
        setSelectedIds(new Set([role.id]));
        setSelectedRows([role]);
        openModal(ModalType.commonModalType.detail, {
          selectedIds: new Set([role.id]),
        });
      }
    },
  })
  .register({
    id: ActionType.commonModalAction.detail,
    label: "مشاهده جزئیات",
    icon: <FaEye />,
    color: Color.info,
    visibility: {
      hidden: (role, { selectedIds }) =>
        role === null ||
        selectedIds.size > 1 ||
        role.status === CommonStatus.DELETED,
    },

    handler: (role, { setData, setSelectedIds, setSelectedRows }) => {
      if (role) {
        setData(role);
        setSelectedIds(new Set([role.id]));
        setSelectedRows([role]);
      }
    },
  })
  .register({
    id: ActionType.commonModalAction.edit,
    label: "ویرایش",
    icon: <FaPen />,
    color: Color.warning,
    visibility: {
      hidden: (role, { selectedIds }) =>
        role === null ||
        role.status === CommonStatus.DELETED ||
        selectedIds.size !== 0,
    },
    handler: (role, { setSelectedIds, setSelectedRows, openModal }) => {
      if (role) {
        setSelectedIds(new Set([role.id]));
        setSelectedRows([role]);
        openModal(ModalType.commonModalType.edit, {
          selectedIds: new Set([role.id]),
          selectedRows: [role],
        });
      }
    },
  })
  .register({
    id: ActionType.roleModalAction.assignPermission,
    label: "تخصیص مجوز",
    icon: <FaUserPen />,
    color: Color.primary,
    visibility: {
      hidden: (role, { selectedIds }) =>
        role === null ||
        role.status === CommonStatus.DELETED ||
        selectedIds.size !== 0,
    },
    handler: (role, { setSelectedIds, setSelectedRows, openModal }) => {
      if (role) {
        setSelectedIds(new Set([role.id]));
        setSelectedRows([role]);
        openModal(ActionType.roleModalAction.assignPermission, {
          selectedIds: new Set([role.id]),
          selectedRows: [role],
        });
      }
    },
  })
  .register({
    id: ActionType.roleModalAction.assignUser,
    label: "تخصیص به کاربر",
    icon: <FaUserPlus />,
    color: Color.secondary,
    visibility: {
      hidden: (role, { selectedIds }) =>
        role === null ||
        role.status === CommonStatus.DELETED ||
        selectedIds.size !== 0,
    },
    handler: (role, { setSelectedIds, setSelectedRows, openModal }) => {
      if (role) {
        setSelectedIds(new Set([role.id]));
        setSelectedRows([role]);
        openModal(ActionType.roleModalAction.assignUser, {
          selectedIds: new Set([role.id]),
          selectedRows: [role],
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
      hidden: (role, { selectedIds }) =>
        role === null ||
        role.status === CommonStatus.DELETED ||
        selectedIds.size !== 0,
    },
    handler: (role, { setSelectedIds, setSelectedRows, openModal }) => {
      if (role) {
        setSelectedIds(new Set([role.id]));
        setSelectedRows([role]);
        openModal(ModalType.commonModalType.delete, {
          selectedIds: new Set([role.id]),
          selectedRows: [role],
        });
      }
    },
  })

  .register({
    id: ActionType.commonModalAction.restore,
    label: "بازیابی",
    icon: <FaRecycle />,
    color: Color.warning,
    visibility: {
      hidden: (role, { selectedIds }) =>
        role === null ||
        role.status !== CommonStatus.DELETED ||
        selectedIds.size != 0,
    },
    handler: (role, { setSelectedIds, setSelectedRows, openModal }) => {
      if (role) {
        setSelectedIds(new Set([role.id]));
        setSelectedRows([role]);
        openModal(ActionType.commonModalAction.restore, {
          selectedIds: new Set([role.id]),
          selectedRows: [role],
        });
      }
    },
  })
  .register({
    id: ActionType.commonModalAction.restores,
    label: "بازیابی نقش ها",
    color: Color.warning,
    visibility: {
      hidden: (item, { selectedIds, selectedRows }) =>
        item !== null || // فقط در هدر نمایش داده شود
        selectedIds.size === 0 ||
        selectedRows.some((role) => role.status !== CommonStatus.DELETED),
    },
    handler: (_, { openModal, selectedIds, selectedRows }) => {
      openModal(ActionType.commonModalAction.restores, {
        selectedIds,
        selectedRows,
      });
    },
  });
