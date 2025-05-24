"use client";
import DynamicTable from "@/components/admin/dynamics/DynamicTable";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import PersianDate from "persian-date";
import { useEffect, useState } from "react";
import { DataStatus } from "@/constants/data/DataStatus";
import { FaTrash } from "react-icons/fa6";
import { Role } from "@/types/Role";
import { useRole } from "@/hooks/useRole";
import DeletePermissionRolesModal from "./DeletePermissionRolesModal";

export default function PermissionRolesViewTable({
  permissionId,
  setPermissionRolesPage,
  permissionRolesPage,
}: {
  permissionId: number | null;
  setPermissionRolesPage: (page: string) => void;
  permissionRolesPage: string;
}) {
  const {
    meta,
    error,
    loading,
    assigned,
    actions: { fetchPermissionRoles },
  } = useRole();

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [deletePermissionRolesModal, setDeletePermissionRolesModal] =
    useState(false);
  useEffect(() => {
    const fetchPermissionRolesData = async () => {
      if (permissionId) {
        return await fetchPermissionRoles(permissionId, "10", permissionRolesPage);
      }
    };
    fetchPermissionRolesData();
  }, [permissionId, permissionRolesPage]);

  async function onCloseDeletePermissionRolesModal() {
    setDeletePermissionRolesModal(false);
    setSelectedIds(new Set());
  }
  function onOpenDeletePermissionRolesModal() {
    setDeletePermissionRolesModal(true);
  }

  const InitialPermissionRolesViewTable: IDynamicTable<Role> = {
    header: {
      title: "نقش های مجوز",
      actions: [
        {
          name: "delete",
          caption: "حذف نقش از مجوز",
          icon: <FaTrash />,
          handler: () => {
            onOpenDeletePermissionRolesModal();
          },
          disabled: selectedIds.size === 0,
          color: "danger",
        },
      ],
    },
    data: permissionId && assigned ? assigned : [],
    columns: [
      {
        className: "text-center",
        header: "نام نقش",
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
        dynamicTable={InitialPermissionRolesViewTable}
        setPage={setPermissionRolesPage}
      />
      {permissionId && (
        <DeletePermissionRolesModal
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          setDeletePermissionRolesModal={setDeletePermissionRolesModal}
          deletePermissionRolesModal={deletePermissionRolesModal}
          permissionId={permissionId}
          onCloseDeletePermissionRolesModal={onCloseDeletePermissionRolesModal}
        />
      )}
    </>
  );
}
