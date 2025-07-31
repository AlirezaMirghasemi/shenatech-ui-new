import DynamicTable from "@/components/admin/dynamics/dynamicTable/DynamicTable";
import { DataStatus } from "@/constants/data/DataStatus";
import { useUser } from "@/hooks/useUser";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
import { User } from "@/types/User";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import PersianDate from "persian-date";
import { useEffect, useState } from "react";
import { FaTrash, FaTrashCan } from "react-icons/fa6";
import DeleteUsersFromRoleModal from "./DeleteUsersFromRoleModal";
import { Role } from "@/types/Role";
import { Color } from "@/constants/data/Color";

export default function RoleUsersViewTable({
  //roleId,
  role,
  setRoleUsersPage,
  roleUsersPage,

}: {
  //roleId: number | null;
  role: Role | null;
  setRoleUsersPage: (page: string) => void;
  roleUsersPage: string;
}) {
  const {
    users,
    meta,
    error,
    loading,
    actions: { fetchRoleUsers },
  } = useUser();
  useEffect(() => {
    const fetchRoleUsersData = async () => {
      if (role?.id) {
      return  await fetchRoleUsers(role.id, {page:roleUsersPage,perPage:"10"});
      }
    };
    fetchRoleUsersData();
  }, [ role,roleUsersPage]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [deleteUsersFromRoleModal, setDeleteUsersFromRoleModal] =
    useState(false);
  const onOpenDeleteUsersFromRoleModal = () => {
    setDeleteUsersFromRoleModal(true);
  };
  const onCloseDeleteUsersFromRoleModal = () => {
    setSelectedIds(new Set());
    setDeleteUsersFromRoleModal(false);
  };

  const InitialRoleUsersViewTable: IDynamicTable<User> = {
    header: {
      title: "کاربران نقش",
      actions: [
        {
          name: "delete",
          caption: "حذف کاربر از نقش",
          icon: <FaTrash />,
          handler: () => {
            onOpenDeleteUsersFromRoleModal();
          },
          disabled: selectedIds.size === 0,
          hidden:selectedIds.size === 0,
          color: Color.danger,
        },
      ],
    },
    actions: [
      {
        name: "Delete",
        caption: "حذف",
        icon: <FaTrashCan />,
        color: "danger",
        className: "!rounded-xl",
        handler: (row) => {
          setSelectedIds(new Set([row.id]));
          onOpenDeleteUsersFromRoleModal();
        },
        hidden:selectedIds.size > 0,
      },
    ],
    data: role && users ? users : [],
    columns: [
      {
        className: "text-center",
        header: "نام کاربری",
        accessor: "username",
      },
      {
        className: "text-center",
        header: "پست الکترونیکی",
        accessor: "email",
      },
      {
        className: "text-center",
        header: "تاریخ ایجاد",
        accessor: "created_at",
        cellRenderer: (row) => {
          const date = new PersianDate(new Date(row.created_at)).format(
            "HH:mm:ss - YYYY/MM/DD"
          );
          return date;
        },
      },
      {
        className: "text-center",
        header: "تاریخ ویرایش",
        accessor: "updated_at",
        cellRenderer: (row) => {
          const date = new PersianDate(new Date(row.updated_at)).format(
            "HH:mm:ss - YYYY/MM/DD"
          );
          return date;
        },
      },
    ],
    rowKey: "id",
    error: error?.toString(),
    loading: loading === DataStatus.PENDING,
    pagination: meta,
    checkboxTable: {
      selectedIds,
      setSelectedIds,
    },
  };
  return (
    <>
      <DynamicTable
        dynamicTable={InitialRoleUsersViewTable}
        setPage={setRoleUsersPage}
      />
      {selectedIds && role && (
        <DeleteUsersFromRoleModal
          deleteUsersFromRoleModal={deleteUsersFromRoleModal}
          onCloseDeleteUsersFromRoleModal={onCloseDeleteUsersFromRoleModal}
          selectedIds={selectedIds}
          roleId={role.id}
        />
      )}
    </>
  );
}
