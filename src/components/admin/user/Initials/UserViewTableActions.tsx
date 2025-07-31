import { Color } from "@/constants/data/Color";
import { UserStatus } from "@/constants/data/UserStatus";
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
import { ModalType } from "@/constants/data/Modal";
import { ActionType } from "@/constants/data/ActionsButton";

export const UserViewTableActions = new ActionRegistry<User>()
  .register({
    id: ActionType.commonModalAction.create,
    label: "ایجاد کاربر",
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
      hidden: (user, { selectedIds }) =>
        user === null ||
        selectedIds.size > 1 ||
        (user as User).status === UserStatus.DELETED,
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
    id: ActionType.commonModalAction.info,
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
        openModal(ModalType.commonModalType.detail, {
          selectedIds: new Set([user.id]),
        });
      }
    },
  })
  .register({
    id: ActionType.userModalAction.changeStatus,
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
    id: ActionType.commonModalAction.edit,
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
        openModal(ModalType.commonModalType.edit, {
          selectedIds: new Set([user.id]),
          selectedRows: [user],
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
      hidden: (user, { selectedIds }) =>
        user === null ||
        selectedIds.size !== 0 ||
        user.status === UserStatus.DELETED,
    },
    handler: (user, { setSelectedIds, setSelectedRows, openModal }) => {
      if (user) {
        setSelectedIds(new Set([user.id]));
        setSelectedRows([user]);
        openModal(ModalType.commonModalType.delete, {
          selectedIds: new Set([user.id]),
          selectedRows: [user],
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
      hidden: (user, { selectedIds }) =>
        user === null ||
        user.status !== UserStatus.DELETED ||
        selectedIds.size != 0,
    },
    handler: (user, { setSelectedIds, setSelectedRows, openModal }) => {
      if (user) {
        setSelectedIds(new Set([user.id]));
        setSelectedRows([user]);
        openModal(ModalType.commonModalType.restore, {
          selectedIds: new Set([user.id]),
          selectedRows: [user],
        });
      }
    },
  })
  .register({
    id: ActionType.commonModalAction.restores,
    label: "بازیابی کاربران",
    color: Color.warning,
    visibility: {
      hidden: (item, { selectedIds, selectedRows }) =>
        item !== null || // فقط در هدر نمایش داده شود
        selectedIds.size === 0 ||
        selectedRows.some((user) => user.status !== UserStatus.DELETED),
    },
    handler: (_, { openModal, selectedIds, selectedRows }) => {
      openModal(ModalType.commonModalType.restores, {
        selectedIds,
        selectedRows,
      });
    },
  });
