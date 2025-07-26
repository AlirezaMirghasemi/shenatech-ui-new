import { ActionType } from "@/constants/data/ActionsButton";
import { Color } from "@/constants/data/Color";
import { CommonStatus } from "@/constants/data/CommonStatus";
import { Modal } from "@/constants/data/ModalType";
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
    id: ActionType.CommonActionType.CREATE,
    label: "ایجاد نقش",
    color: Color.success,
    visibility: {
      hidden: (item, { selectedIds }) => item !== null || selectedIds.size != 0,
    },
    handler: (_, { openModal }) => openModal(Modal.create, {}),
  })
  .register({
    id: ActionType.CommonActionType.DETAIL,
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
        openModal(Modal.detail, { selectedIds: new Set([role.id]) });
      }
    },
  })
  .register({
    id: ActionType.CommonActionType.DETAIL,
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
    id: ActionType.CommonActionType.EDIT,
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
        openModal(Modal.edit, {
          selectedIds: new Set([role.id]),
          selectedRows: [role],
        });
      }
    },
  })
  .register({
    id: ActionType.RoleActionType.ASSIGN_PERMISSION,
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
        openModal(Modal.edit, {
          selectedIds: new Set([role.id]),
          selectedRows: [role],
        });
      }
    },
  })
  .register({
    id: ActionType.RoleActionType.ASSIGN_USER,
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
        openModal(Modal.edit, {
          selectedIds: new Set([role.id]),
          selectedRows: [role],
        });
      }
    },
  })
  .register({
    id: ActionType.CommonActionType.DELETE,
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
        openModal(Modal.delete, {
          selectedIds: new Set([role.id]),
          selectedRows: [role],
        });
      }
    },
  })
  .register({
    id: ActionType.CommonActionType.DELETES,
    label: "حذف نقش ها",
    color: Color.danger,
    visibility: {
      hidden: (item, { selectedIds, selectedRows }) =>
        item !== null ||
        selectedIds.size === 0 ||
        selectedRows.some((role) => role.status === CommonStatus.DELETED),
    },
    handler: (_, { openModal, selectedIds, selectedRows }) => {
      openModal(Modal.delete, { selectedIds, selectedRows });
    },
  })
  .register({
    id: ActionType.CommonActionType.RESTORE,
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
        openModal(Modal.restore, {
          selectedIds: new Set([role.id]),
          selectedRows: [role],
        });
      }
    },
  })
  .register({
    id: ActionType.CommonActionType.RESTORES,
    label: "بازیابی نقش ها",
    color: Color.warning,
    visibility: {
      hidden: (item, { selectedIds, selectedRows }) =>
        item !== null || // فقط در هدر نمایش داده شود
        selectedIds.size === 0 ||
        selectedRows.some((role) => role.status !== CommonStatus.DELETED),
    },
    handler: (_, { openModal, selectedIds, selectedRows }) => {
      openModal(Modal.restore, { selectedIds, selectedRows });
    },
  });

//   const InitialRolesViewTable: IDynamicTable<Role> = {
//
//
//
//       rowKey: "id",
//       error: error?.toString(),
//       loading: loading === DataStatus.PENDING,
//       pagination: meta,
//       actionCellClassName: "text-center",
//       className: (row) => (row.id === role?.id ? "!bg-bg-active " : ""),
//     };
