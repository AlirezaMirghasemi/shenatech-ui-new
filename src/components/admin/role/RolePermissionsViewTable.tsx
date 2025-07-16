"use client";
import DynamicTable from "@/components/admin/dynamics/dynamicTable/DynamicTable";
import { Permission } from "../../../types/Permission";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import PersianDate from "persian-date";
import { useEffect, useState } from "react";
import { usePermission } from "@/hooks/usePermission";
import { DataStatus } from "@/constants/data/DataStatus";
import { FaTrash, FaTrashCan } from "react-icons/fa6";
import DeleteRolePermissionsModal from "@/components/admin/role/DeleteRolePermissionsModal";
import { Role } from "@/types/Role";

export default function RolePermissionsViewTable({
  role,
  setRolePermissionsPage,
  rolePermissionsPage,

}: {
  role: Role | null;
  setRolePermissionsPage: (page: string) => void;
  rolePermissionsPage: string;
}) {
  const {
    assigned,
    meta,
    error,
    loading,
    actions: { fetchRolePermissions },
  } = usePermission();

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [deleteRolePermissionsModal, setDeleteRolePermissionsModal] =
    useState(false);
  useEffect(() => {
    const fetchRolePermissionsData = async () => {
      if (role?.id) {
        return await fetchRolePermissions(role?.id, "10", rolePermissionsPage);
      }
    };
    fetchRolePermissionsData();
  }, [role, rolePermissionsPage]);

  async function onCloseDeleteRolePermissionsModal() {
    setSelectedIds(new Set());
    setDeleteRolePermissionsModal(false);
  }
  function onOpenDeleteRolePermissionsModal() {
    setDeleteRolePermissionsModal(true);
  }

  const InitialRolePermissionsViewTable: IDynamicTable<Permission> = {
    header: {
      title: "مجوز های نقش",
      actions: [
        {
          name: "delete",
          caption: "حذف مجوز از نقش",
          icon: <FaTrash />,
          handler: () => {
            onOpenDeleteRolePermissionsModal();
          },
          disabled: selectedIds.size === 0,
          hidden:selectedIds.size === 0,
          color: "danger",
        },
      ],
    },
    data: role && assigned ? assigned : [],
    columns: [
      {
        className: "text-center",
        header: "نام مجوز",
        accessor: "name",
      },
      {
        className: "text-center",
        header: "نام گارد",
        accessor: "guard_name",
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
    actions:[{
            name: "Delete",
            caption: "حذف",
            icon: <FaTrashCan />,
            color: "danger",
            className: "!rounded-xl",
            handler: (row) => {
              setSelectedIds(new Set([row.id]));
              onOpenDeleteRolePermissionsModal();
            },
            hidden:selectedIds.size > 0
          }],
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
        dynamicTable={InitialRolePermissionsViewTable}
        setPage={setRolePermissionsPage}
      />
      {role && (
        <DeleteRolePermissionsModal
          selectedIds={selectedIds}
          deleteRolePermissionsModal={deleteRolePermissionsModal}
          roleId={role.id}
          onCloseDeleteRolePermissionsModal={onCloseDeleteRolePermissionsModal}
        />
      )}
    </>
  );
}
