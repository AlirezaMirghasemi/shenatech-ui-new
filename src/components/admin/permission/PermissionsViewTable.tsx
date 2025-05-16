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
import { FaEye, FaPen, FaTrashCan, FaUserPen } from "react-icons/fa6";

export default function PermissionsViewTable() {
  const {
    permissions,
    loading,
    error,
    meta,
    actions: { fetchPermissions },
  } = usePermission();
  const [permissionsPage, setPermissionsPage] = useState("1");
  const [selectedPermissionId, setSelectedPermissionId] = useState<number | null>(null);
//   const [permission, setPermission] = useState<Permission | null>(null);
  useEffect(() => {
    const fetchPermissionsData = async () => {
      await fetchPermissions(permissionsPage, "5");
      setSelectedPermissionId(null);
    };
    fetchPermissionsData();
  }, [permissionsPage]);
//   const [assignPermissionModal, setAssignPermissionModal] = useState(false);
//   const [createRoleModal, setCreateRoleModal] = useState(false);
//   const [editRoleModal, setEditRoleModal] = useState(false);
//   const [deleteRoleModal, setDeleteRoleModal] = useState(false);
//   function onCloseCreateRoleModal() {
//     setCreateRoleModal(false);
//   }
//   function onCloseDeleteRoleModal() {
//     setDeleteRoleModal(false);
//     setRoleId(null);
//     setRole(null);
//   }
//   function onCloseEditRoleModal() {
//     setEditRoleModal(false);
//     setSelectedRoleId(null);
//   }
//   function onCloseAssignPermissionModal() {
//     setAssignPermissionModal(false);
//     setSelectedRoleId(null);
//     setRoleId(null);
//     setRole(null);
//   }
//   function onOpenAssignPermissionModal(role: Role) {
//     setRole(role);
//     setSelectedRoleId(role.id);
//     setRoleId(role.id);
//     setAssignPermissionModal(true);
//   }

  const InitialPermissionsViewTable: IDynamicTable<Permission> = {
    header: {
      title: "مجوز ها",
      actions: [
        {
          name: "Create",
          caption: "ایجاد مجوز",
          handler: () => {
            //setCreateRoleModal(true);
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
        caption: "تخصیص مجوز",
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
        name: "Edit",
        caption: "ویرایش",
        icon: <FaPen />,
        color: "warning",
        className: "!rounded-none",
        handler: () => {
        //   setRole(row);
        //   setEditRoleModal(true);
        },
      },
      {
        name: "Delete",
        caption: "حذف",
        icon: <FaTrashCan />,
        color: "danger",
        className: "!rounded-r-none",
        handler: () => {
        //   setRole(row);
        //   setDeleteRoleModal(true);
        },
      },
    ],
    rowKey: "id",
    error: error?.toString(),
    loading: loading === DataStatus.PENDING,
    pagination: meta,
    actionCellClassName: "text-center",
    className: (row) => (row.id === selectedPermissionId ? "!bg-bg-active " : ""),
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
      <CreateRoleModal
        setCreateRoleModal={setCreateRoleModal}
        createRoleModal={createRoleModal}
        onCloseCreateRoleModal={onCloseCreateRoleModal}
      />
      {role && (
        <DeleteRoleModal
          deleteRoleModal={deleteRoleModal}
          setDeleteRoleModal={setDeleteRoleModal}
          roleId={role.id}
          onCloseDeleteRoleModal={onCloseDeleteRoleModal}
        />
      )} */}
    </>
  );
}
