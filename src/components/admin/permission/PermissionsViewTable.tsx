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

export default function PermissionsViewTable() {
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
    };
    fetchPermissionsData();
  }, [permissionsPage]);
  //   const [assignPermissionModal, setAssignPermissionModal] = useState(false);
  const [createPermissionModal, setCreatePermissionModal] = useState(false);
  //   const [editRoleModal, setEditRoleModal] = useState(false);
  const [deletePermissionsModal, setDeletePermissionsModal] = useState(false);
  function onCloseCreatePermissionModal() {
    setCreatePermissionModal(false);
  }
  function onCloseDeletePermissionsModal() {
    setDeletePermissionsModal(false);
    setPermission(null);
  }

  const InitialPermissionsViewTable: IDynamicTable<Permission> = {
    header: {
      title: "مجوز ها",
      actions: [
        {
          name: "Create",
          caption: "ایجاد مجوز",
          handler: () => {
            setCreatePermissionModal(true);
          },
        },
        {
          name: "delete",
          caption: "حذف مجوز",
          icon: <FaTrash />,
          handler: () => {
            setDeletePermissionsModal(true);
          },
          disabled: selectedIds.size === 0,
          color: "danger",
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
        handler: () => {
          //   setSelectedRoleId(row.id);
          //   setRoleId(row.id);
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
        handler: () => {
          //   assignPermissionModal
          //     ? onCloseAssignPermissionModal()
          //     : onOpenAssignPermissionModal(row),
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

      {/* {role && (
        <AssignPermissionModal
          assignPermissionModal={assignPermissionModal}
          onCloseAssignPermissionModal={onCloseAssignPermissionModal}
          role={role}
          setAssignPermissionModal={setAssignPermissionModal}
          setRoleId={setRoleId}
        />
      )}
      {role && (
        <EditRoleModal
          editRoleModal={editRoleModal}
          onCloseEditRoleModal={onCloseEditRoleModal}
          role={role}
          setEditRoleModal={setEditRoleModal}
        />
      )}

       */}
      <CreatePermissionModal
        setCreatePermissionModal={setCreatePermissionModal}
        createPermissionModal={createPermissionModal}
        onCloseCreatePermissionModal={onCloseCreatePermissionModal}
      />
      {(selectedIds || permission) && (
        <DeletePermissionModal
          deletePermissionsModal={deletePermissionsModal}
          setDeletePermissionsModal={setDeletePermissionsModal}
          permissionIds={
            selectedIds ? [...selectedIds] : permission ? [permission.id] : []
          }
          onCloseDeletePermissionsModal={onCloseDeletePermissionsModal}
        />
      )}
    </>
  );
}
