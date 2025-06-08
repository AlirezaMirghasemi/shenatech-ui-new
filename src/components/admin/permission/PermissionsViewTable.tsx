"use client";
import DynamicTable from "@/components/admin/dynamics/DynamicTable";
import { DataStatus } from "@/constants/data/DataStatus";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import PersianDate from "persian-date";
import { usePermission } from "@/hooks/usePermission";
import { Permission } from "@/types/Permission";
import { FaEye, FaTrash, FaTrashCan, FaUserPen } from "react-icons/fa6";
import CreatePermissionModal from "./CreatePermissionModal";
import DeletePermissionsModal from "./DeletePermissionsModal";
import AssignPermissionsToRoleModal from "./AssignPermissionsToRoleModal";

export default function PermissionsViewTable({
  permission,
  setPermission,
  ShowPermissionDetails,
  setPermissionRolesPage,
  setPermissionUsersPage,
}: {
  permission: Permission | null;
  setPermission: (permission: Permission | null) => void;
  ShowPermissionDetails: (permission: Permission) => void;
  setPermissionRolesPage: (page: string) => void;
  setPermissionUsersPage: (page: string) => void;
}) {
  const {
    permissions,
    loading,
    error,
    meta,
    actions: { fetchPermissions },
  } = usePermission();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    new Set<number>()
  );

  const [permissionsPage, setPermissionsPage] = useState("1");
  useEffect(() => {
    const fetchPermissionsData = async () => {
      await fetchPermissions(permissionsPage, "5");
      setPermissionRolesPage("1");
      setPermissionUsersPage("1");
    };
    fetchPermissionsData();
  }, [permissionsPage]);
  const [assignPermissionsToRoleModal, setAssignPermissionsToRoleModal] =
    useState(false);
  const [createPermissionModal, setCreatePermissionModal] = useState(false);
  const [deletePermissionsModal, setDeletePermissionsModal] = useState(false);
  function onOpenCreatePermissionModal() {
    setCreatePermissionModal(true);
  }
  function onCloseCreatePermissionModal() {
    setCreatePermissionModal(false);
    setPermission(null);
  }
  function onOpenDeletePermissionsModal(permissionIds: Set<number>) {
    setDeletePermissionsModal(true);
    setSelectedIds(permissionIds);
  }
  function onCloseDeletePermissionsModal() {
    setDeletePermissionsModal(false);
    setSelectedIds(new Set());
  }
  function onOpenAssignPermissionsToRoleModal(permissionIds: Set<number>) {
    setAssignPermissionsToRoleModal(true);
    setSelectedIds(permissionIds);
  }
  function onCloseAssignPermissionsToRoleModal() {
    setAssignPermissionsToRoleModal(false);
    setSelectedIds(new Set());
    setPermission(null);
  }

  const InitialPermissionsViewTable: IDynamicTable<Permission> = {
    header: {
      title: "مجوز ها",
      actions: [
        {
          name: "delete",
          caption: "حذف مجوز ها",
          icon: <FaTrash />,
          handler: () => {
            onOpenDeletePermissionsModal(selectedIds);
          },
          disabled: selectedIds.size === 0,
          color: "danger",
        },
        {
          name: "assignPermissionsToRole",
          caption: "تخصیص مجوز ها به نقش",
          icon: <FaUserPen />,
          handler: () => {
            onOpenAssignPermissionsToRoleModal(selectedIds);
          },
          disabled: selectedIds.size === 0,
          color: "info",
        },
        {
          name: "Create",
          caption: "ایجاد مجوز",
          handler: () => {
            onOpenCreatePermissionModal();
          },
        },
      ],
    },
    data: permissions ?? [],
    columns: [
      {
        header: "نام مجوز",
        accessor: "name",
        className: "text-center",
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
        name: "ShowPermissionDetails",
        caption: "مشاهده ی جزییات",
        handler: (row: Permission) => {
          ShowPermissionDetails(row);
        },
        icon: <FaEye />,
        color: "info",
        className: "!rounded-l-none",
      },
      {
        name: "assignPermission",
        caption: "تخصیص به نقش",
        icon: <FaUserPen />,
        color: "primary",
        className: "!rounded-none",
        handler: (row) => {
          setPermission(row);
          onOpenAssignPermissionsToRoleModal(new Set([row.id]));
        },
      },

      {
        name: "Delete",
        caption: "حذف",
        icon: <FaTrashCan />,
        color: "danger",
        className: "!rounded-r-none",
        handler: (row) => {
          setPermission(row);
          onOpenDeletePermissionsModal(new Set([row.id]));
        },
      },
    ],
    rowKey: "id",
    checkboxTable: {
      selectedIds,
      setSelectedIds,
    },
    error: error?.toString(),
    loading: loading === DataStatus.PENDING,
    pagination: meta,
    actionCellClassName: "text-center",
    className: (row) => (row.id === permission?.id ? "!bg-bg-active " : ""),
  };
  return (
    <>
      <DynamicTable
        dynamicTable={InitialPermissionsViewTable}
        setPage={setPermissionsPage}
      />

      <CreatePermissionModal
        createPermissionModal={createPermissionModal}
        onCloseCreatePermissionModal={onCloseCreatePermissionModal}
      />
      {(selectedIds || permission) && (
        <>
          <DeletePermissionsModal
            deletePermissionsModal={deletePermissionsModal}
            onCloseDeletePermissionsModal={onCloseDeletePermissionsModal}
            selectedIds={selectedIds}
          />
          <AssignPermissionsToRoleModal
            onCloseAssignPermissionsToRoleModal={
              onCloseAssignPermissionsToRoleModal
            }
            assignPermissionsToRoleModal={assignPermissionsToRoleModal}
            selectedIds={Array.from(selectedIds)}
            permissions={permissions}
          />
        </>
      )}
    </>
  );
}
