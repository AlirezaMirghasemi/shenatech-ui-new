// src/app/users/components/TagsViewTableActions.ts
import { ActionType } from "@/constants/data/ActionsButton";
import { Color } from "@/constants/data/Color";
import { UserStatus } from "@/constants/data/UserStatus";
import { Modal } from "@/constants/data/ModalType";
import { User } from "@/types/User";
import { ActionRegistry } from "@/utils/ActionRegistry";
import {
  FaClipboardUser,
  FaEye,
  FaPen,
  FaRecycle,
  FaTrashCan,
  FaUserCheck,
} from "react-icons/fa6";
import ChangeUserStatusPopover from "../ChangeUserStatusPopover";

export const UserViewTableActions = new ActionRegistry<User>()
  .register({
    id: ActionType.CommonActionType.CREATE,
    label: "ایجاد کاربر",
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
      hidden: (user, { selectedIds }) =>
        user === null ||
        selectedIds.size > 1 ||
        user.status === UserStatus.DELETED,
    },

    handler: (user, { setData, setSelectedIds, setSelectedRows }) => {
      if (user) {
        setData(user);
        setSelectedIds(new Set([user.id]));
        setSelectedRows([user]);
      }
    },
  })
  .register({
    id: ActionType.CommonActionType.INFO,
    label: "مشاهده پروفایل",
    icon: <FaClipboardUser />,
    color: Color.success,
    visibility: {
      hidden: (user, { selectedIds }) => user === null || selectedIds.size > 1,
    },
    handler: (user, { setSelectedIds, setSelectedRows, openModal }) => {
      if (user) {
        setSelectedIds(new Set([user.id]));
        setSelectedRows([user]);
        openModal(Modal.detail, { selectedIds: new Set([user.id]) });
      }
    },
  })
  .register({
    id: ActionType.UserActionType.CHANGE_STATUS,
    label: "تغییر وضعیت کاربر",
    color: Color.primary,
    visibility: {
      hidden: (user, { selectedIds }) =>
        user === null ||
        user.status === UserStatus.DELETED ||
        selectedIds.size !== 0,
    },
    actionRender: (row: User) => (
      <ChangeUserStatusPopover
        user={row}
        buttonProps={{
          name: "changeStatus",
          color: Color.info,
          icon: <FaUserCheck />,
        }}
        key={`change-status-${row.id}`}
      />
    ),
    handler: () => {},
  })

  .register({
    id: ActionType.CommonActionType.EDIT,
    label: "ویرایش",
    icon: <FaPen />,
    color: Color.warning,
    visibility: {
      hidden: (user, { selectedIds }) =>
        user === null ||
        user.status === UserStatus.DELETED ||
        selectedIds.size !== 0,
    },
    handler: (user, { setSelectedIds, setSelectedRows, openModal }) => {
      if (user) {
        setSelectedIds(new Set([user.id]));
        setSelectedRows([user]);
        openModal(Modal.edit, {
          selectedIds: new Set([user.id]),
          selectedRows: [user],
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
      hidden: (user, { selectedIds }) =>
        user === null ||
        selectedIds.size !== 0 ||
        user.status === UserStatus.DELETED,
    },
    handler: (user, { setSelectedIds, setSelectedRows, openModal }) => {
      if (user) {
        setSelectedIds(new Set([user.id]));
        setSelectedRows([user]);
        openModal(Modal.delete, {
          selectedIds: new Set([user.id]),
          selectedRows: [user],
        });
      }
    },
  })

  .register({
    id: ActionType.CommonActionType.RESTORE,
    label: "بازیابی",
    icon: <FaRecycle />,
    color: Color.warning,
    visibility: {
      hidden: (user, { selectedIds }) =>
        user === null ||
        user.status !== UserStatus.DELETED ||
        selectedIds.size != 0,
    },
    handler: (user, { setSelectedIds, setSelectedRows, openModal }) => {
      if (user) {
        setSelectedIds(new Set([user.id]));
        setSelectedRows([user]);
        openModal(Modal.restore, {
          selectedIds: new Set([user.id]),
          selectedRows: [user],
        });
      }
    },
  })
  .register({
    id: ActionType.CommonActionType.RESTORES,
    label: "بازیابی کاربران",
    color: Color.warning,
    visibility: {
      hidden: (item, { selectedIds, selectedRows }) =>
        item !== null || // فقط در هدر نمایش داده شود
        selectedIds.size === 0 ||
        selectedRows.some((user) => user.status !== UserStatus.DELETED),
    },
    handler: (_, { openModal, selectedIds, selectedRows }) => {
      openModal(Modal.restore, { selectedIds, selectedRows });
    },
  });
