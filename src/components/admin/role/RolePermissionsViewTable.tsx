"use client";
import DynamicTable from "@/components/admin/dynamics/DynamicTable";
import { Permission } from "../../../types/Permission";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import PersianDate from "persian-date";
import { useEffect, useState } from "react";
import { usePermission } from "@/hooks/usePermission";
import { DataStatus } from "@/constants/data/DataStatus";
import { FaTrash } from "react-icons/fa6";
import DeleteRolePermissionsModal from "@/components/admin/role/DeleteRolePermissionsModal";

export default function RolePermissionsViewTable({
  roleId,
  setRolePermissionsPage,
  rolePermissionsPage,
}: {
  roleId: number | null;
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
      if (roleId) {
        return await fetchRolePermissions(roleId, "10", rolePermissionsPage);
      }
    };
    fetchRolePermissionsData();
  }, [roleId, rolePermissionsPage]);

  async function onCloseDeleteRolePermissionsModal() {
    setDeleteRolePermissionsModal(false);
    setSelectedIds(new Set());
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
          caption: "حذف مجوز",
          icon: <FaTrash />,
          handler: () => {
            onOpenDeleteRolePermissionsModal();
          },
          disabled: selectedIds.size === 0,
          color: "danger",
        },
      ],
    },
    data: roleId && assigned ? assigned : [],
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
      {roleId && (
        <DeleteRolePermissionsModal
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          setDeleteRolePermissionsModal={setDeleteRolePermissionsModal}
          deleteRolePermissionsModal={deleteRolePermissionsModal}
          roleId={roleId}
          onCloseDeleteRolePermissionsModal={onCloseDeleteRolePermissionsModal}
        />
      )}
    </>
  );
}
