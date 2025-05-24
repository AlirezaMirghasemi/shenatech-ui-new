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
import DeletePermissionModal from "./DeletePermissionsModal";
import AssignPermissionsToRoleModal from "./AssignPermissionsToRoleModal";

export default function PermissionsViewTable({
  setPermissionId,
  setPermissionRolesPage,
  setPermissionUsersPage,
}: {
  setPermissionId: (id: number | null) => void;
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
  const [selectedPermissionId, setSelectedPermissionId] = useState<
    number | null
  >(null);
  const [permission, setPermission] = useState<Permission | null>(null);
  useEffect(() => {
    const fetchPermissionsData = async () => {
      await fetchPermissions(permissionsPage, "5");
      setSelectedPermissionId(null);
         setPermissionRolesPage("1");
      setPermissionUsersPage("1");
      setPermissionId(null);
    };
    fetchPermissionsData();
  }, [permissionsPage,permission]);
  const [assignPermissionsToRoleModal, setAssignPermissionsToRoleModal] =
    useState(false);
  const [createPermissionModal, setCreatePermissionModal] = useState(false);
  const [deletePermissionsModal, setDeletePermissionsModal] = useState(false);
     function onCloseCreatePermissionModal() {
    setCreatePermissionModal(false);
  }
  function onCloseDeletePermissionsModal() {
    setDeletePermissionsModal(false);
    setPermission(null);
  }
  function onCloseAssignPermissionsToRoleModal() {
    setAssignPermissionsToRoleModal(false);
    setSelectedPermissionId(null);
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
            setDeletePermissionsModal(true);
          },
          disabled: selectedIds.size === 0,
          color: "danger",
        },
        {
          name: "assignPermissionsToRole",
          caption: "تخصیص مجوز ها به نقش",
          icon: <FaUserPen />,
          handler: () => {
            setAssignPermissionsToRoleModal(true);
          },
          disabled: selectedIds.size === 0,
          color: "info",
        },
        {
          name: "Create",
          caption: "ایجاد مجوز",
          handler: () => {
            setCreatePermissionModal(true);
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
        name: "ShowRoleDetails",
        caption: "مشاهده ی جزییات",
        handler: (row) => {
            setSelectedPermissionId(row.id);
            setPermissionId(row.id);
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
          setSelectedIds(row.id ? new Set([row.id]) : new Set());
          setAssignPermissionsToRoleModal(true);
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
          setSelectedIds(row.id ? new Set([row.id]) : new Set());
          setDeletePermissionsModal(true);
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
    className: (row) =>
      row.id === selectedPermissionId ? "!bg-bg-active " : "",
  };
  return (
    <>
      <DynamicTable
        dynamicTable={InitialPermissionsViewTable}
        setPage={setPermissionsPage}
      />

      <CreatePermissionModal
        setCreatePermissionModal={setCreatePermissionModal}
        createPermissionModal={createPermissionModal}
        onCloseCreatePermissionModal={onCloseCreatePermissionModal}
      />
      {(selectedIds || permission) && (
        <>
          <DeletePermissionModal
            deletePermissionsModal={deletePermissionsModal}
            setDeletePermissionsModal={setDeletePermissionsModal}
            permissionIds={
              selectedIds ? [...selectedIds] : permission ? [permission.id] : []
            }
            onCloseDeletePermissionsModal={onCloseDeletePermissionsModal}
          />
          <AssignPermissionsToRoleModal
            setAssignPermissionsToRoleModal={setAssignPermissionsToRoleModal}
            assignPermissionsToRoleModal={assignPermissionsToRoleModal}
            onCloseAssignPermissionsToRoleModal={
              onCloseAssignPermissionsToRoleModal
            }
            permissions={permissions}
            selectedIds={
              selectedIds ? [...selectedIds] : permission ? [permission.id] : []
            }
            setSelectedIds={setSelectedIds}
            setPermissionId={setPermissionId }
          />
        </>
      )}
    </>
  );
}
