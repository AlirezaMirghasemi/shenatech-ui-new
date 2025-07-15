"use client";
import { DataStatus } from "@/constants/data/DataStatus";
import { UserStatus, UserStatusTitles } from "@/constants/data/UserStatus";
import { useUser } from "@/hooks/useUser";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
import { User } from "@/types/User";
import { Dispatch, SetStateAction, useState } from "react";
import {
  FaClipboardUser,
  FaEye,
  FaPen,
  FaTrashCan,
  FaUserCheck,
} from "react-icons/fa6";
import ChangeUserStatusPopover from "../ChangeUserStatusPopover";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import PersianDate from "persian-date";
export default function UsersViewTableInitials({
  user,
  showUserDetails,
  setUser,
  setUserProfileModal,
  setEditUserModal,
  setDeleteUserModal,
  setCreateUserModal,
  searchValue,
  setSearchValue,
  searchRef,
}: {
  user: User | null;
  showUserDetails: (user: User) => void;
  setUser: (user: User | null) => void;
  setUserProfileModal: (userProfileModal: boolean) => void;
  setEditUserModal: (editUserModal: boolean) => void;
  setDeleteUserModal: (deleteUserModal: boolean) => void;
  setCreateUserModal: (createUserModal: boolean) => void;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  searchRef: React.RefObject<HTMLInputElement | null>;
}) {
  const { users, loading, error, meta } = useUser();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    new Set<number>()
  );
  const onOpenUserProfileModal = (row: User) => {
    setUserProfileModal(true);
    setUser(row);
  };

  const onOpenEditUserModal = (row: User) => {
    setEditUserModal(true);
    setUser(row);
  };

  const onOpenDeleteUserModal = (row: User) => {
    setUser(row);
    setDeleteUserModal(true);
  };
  const onOpenCreateUserModal = () => {
    setCreateUserModal(true);
    setUser(null);
  };
  const InitialUsersViewTable: IDynamicTable<User> = {
    header: {
      title: "کاربران",
      actions: [
        {
          name: "Create",
          caption: "ایجاد کاربر",
          handler: () => {
            onOpenCreateUserModal();
          },
        },
      ],
    },
    data: users ?? [],
    columns: [
      {
        header: "نام کاربری",
        accessor: "username",
        className: "text-center",
      },
      {
        header: "ایمیل",
        accessor: "email",
        className: "text-center",
      },
      {
        header: "وضعیت",
        accessor: "status",
        className: "text-center",
        cellRenderer(row) {
          const status = UserStatusTitles.getTitle(row.status);
          switch (row.status) {
            case UserStatus.ACTIVE:
              return <span className="text-success">{status}</span>;
            case UserStatus.DEACTIVATED:
              return <span className="text-danger">{status}</span>;
            case UserStatus.SUSPENDED:
              return <span className="text-warning">{status}</span>;
            case UserStatus.PENDING:
              return <span className="text-info">{status}</span>;
            case UserStatus.DELETED:
              return <span className="text-danger">{status}</span>;
            default:
              return null;
          }
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
        name: "ShowUserDetails",
        caption: "مشاهده ی جزییات",
        handler: (row) => showUserDetails(row),
        icon: <FaEye />,
        color: "info",
      },
      {
        name: "ChangeUserStatus",
        caption: "تغییر وضعیت کاربر",
        icon: <FaUserCheck />,
        color: "primary",
        disabled: (row) => row.status === UserStatus.DELETED,
        hidden: (row) => row.status === UserStatus.DELETED,
        actionRenderer(row) {
          return <ChangeUserStatusPopover user={row} buttonProps={this} />;
        },
      },
      {
        name: "ShowUserProfile",
        caption: "مشاهده ی پروفایل",
        handler: onOpenUserProfileModal,
        icon: <FaClipboardUser />,
        color: "success",
      },
      {
        disabled: (row) => row.status === UserStatus.DELETED,
        hidden: (row) => row.status === UserStatus.DELETED,
        name: "Edit",
        caption: "ویرایش",
        icon: <FaPen />,
        color: "warning",
        handler: onOpenEditUserModal,
      },
      {
        disabled: (row) => row.status === UserStatus.DELETED,
        hidden: (row) => row.status === UserStatus.DELETED,
        name: "Delete",
        caption: "حذف",
        icon: <FaTrashCan />,
        color: "danger",
        handler: onOpenDeleteUserModal,
      },
    ],
    rowKey: "id",
    error: error?.toString(),
    loading: loading === DataStatus.PENDING,
    pagination: meta,
    actionCellClassName: "text-center",
    className: (row) => (row === user ? "!bg-bg-active " : ""),
    checkboxTable: {
      selectedIds,
      setSelectedIds,
    },
    searchableTable: {
      searchable: true,
      searchValue: searchValue,
      setSearchValue: setSearchValue,
      searchRef: searchRef,
    },
  };

  return InitialUsersViewTable;
}
//Todo::make another table initialsFile
