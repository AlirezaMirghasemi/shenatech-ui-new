"use client";
import DynamicTable from "@/components/admin/dynamics/DynamicTable";
import { DataStatus } from "@/constants/data/DataStatus";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
import { useEffect, useState } from "react";
import {
  FaClipboardUser,
  FaEye,
  FaPen,
  FaTrashCan,
  FaUserCheck,
} from "react-icons/fa6";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import PersianDate from "persian-date";
import { User } from "@/types/User";
import { useUser } from "@/hooks/useUser";
import { UserStatus } from "@/constants/data/UserStatus";
import UserProfileModal from "./UserProfileModal";
import CreateUserModal from "./CreateUserModal";
import ChangeUserStatusPopover from "./ChangeUserStatusPopover";
import EditUserModal from "./EditUserModal";
export default function UsersViewTable({
  setUserId,
}: {
  setUserId: (userId: number | null) => void;
}) {
  const {
    users,
    loading,
    error,
    meta,
    actions: { fetchUsers },
  } = useUser();
  const [usersPage, setUsersPage] = useState("1");
  //const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfileModal, setUserProfileModal] = useState(false);
  const [createUserModal, setCreateUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  useEffect(() => {
    const fetchUsersData = async () => {
      await fetchUsers(usersPage, "5");
      setUserId(null);
    };
    fetchUsersData();
  }, [usersPage, user]);

  const onCloseUserProfileModal = () => {
    setUserProfileModal(false);
    setUser(null);
  };
  const onOpenUserProfileModal = (row: User) => {
    setUserProfileModal(true);
    setUser(row);
  };
  const onOpenCreateUserModal = () => {
    setCreateUserModal(true);
  };
  const onCloseCreateUserModal = () => {
    setCreateUserModal(false);
    setUser(null);
  };
  const onOpenEditUserModal = (row: User) => {
    setEditUserModal(true);
    setUser(row);
  };
  const onCloseEditUserModal = () => {
    setEditUserModal(false);
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
          switch (row.status) {
            case UserStatus.ACTIVE:
              return <span className="text-success">فعال</span>;
            case UserStatus.DEACTIVATED:
              return <span className="text-danger">غیرفعال</span>;
            case UserStatus.SUSPENDED:
              return <span className="text-warning">معلق</span>;
            case UserStatus.PENDING:
              return <span className="text-info">در حال بررسی</span>;
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
        handler: (row: User) => {
          setUser(row);
          setUserId(row.id);
        },
        icon: <FaEye />,
        color: "info",
        className: "!rounded-l-none",
      },
      {
        name: "ChangeUserStatus",
        caption: "تغییر وضعیت کاربر",
        icon: <FaUserCheck />,
        color: "primary",
        className: "!rounded-none",
        actionRenderer(row) {
          return <ChangeUserStatusPopover user={row} buttonProps={this} />;
        },
      },
      {
        name: "ShowUserProfile",
        caption: "مشاهده ی پروفایل",
        handler: (row: User) => {
          onOpenUserProfileModal(row);
        },
        icon: <FaClipboardUser />,
        color: "success",
        className: "!rounded-none",
      },
      {
        name: "Edit",
        caption: "ویرایش",
        icon: <FaPen />,
        color: "warning",
        className: "!rounded-none",
        handler: (row) => {
          onOpenEditUserModal(row);
        },
      },
      {
        name: "Delete",
        caption: "حذف",
        icon: <FaTrashCan />,
        color: "danger",
        className: "!rounded-r-none",
        handler: (row) => {
          setUser(row);
          //setDeleteUserModal(true);
        },
      },
    ],
    rowKey: "id",
    error: error?.toString(),
    loading: loading === DataStatus.PENDING,
    pagination: meta,
    actionCellClassName: "text-center",
    className: (row) => (row === user ? "!bg-bg-active " : ""),
  };
  return (
    <>
      <DynamicTable
        dynamicTable={InitialUsersViewTable}
        setPage={setUsersPage}
      />
      <CreateUserModal
        createUserModal={createUserModal}
        onCloseCreateUserModal={onCloseCreateUserModal}
      />
      {user && (
        <>
          <UserProfileModal
            user={user}
            onClose={onCloseUserProfileModal}
            userProfileModal={userProfileModal}
          />
          <EditUserModal
            editUserModal={editUserModal}
            onCloseEditUserModal={onCloseEditUserModal}
            user={user}
          />
        </>
      )}
    </>
  );
}
