"use client";
import DynamicTable from "@/components/admin/dynamics/DynamicTable";
import { DataStatus } from "@/constants/data/DataStatus";
import { useRole } from "@/hooks/useRole";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
import { Role } from "@/types/Role";
import { useEffect, useState } from "react";
import { FaEye, FaPen, FaUserPen } from "react-icons/fa6";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import PersianDate from "persian-date";
import CreateRoleModal from "./CreateRoleModal";
import AssignPermissionModal from "./AssignPermissionModal";
import EditRoleModal from "./EditRoleModal";
export default function RolesViewTable({
  setRoleId,
  setRoleUsersPage,
  setRolePermissionsPage,
}: {
  setRoleId: (roleId: number | null) => void;
  setRoleUsersPage: (page: string) => void;
  setRolePermissionsPage: (page: string) => void;
}) {
  const {
    roles,
    loading,
    error,
    meta,
    actions: { fetchRoles },
  } = useRole();
  const [rolesPage, setRolesPage] = useState("1");
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  useEffect(() => {
    const fetchRolesData = async () => {
      await fetchRoles(rolesPage, "5");
      setRoleId(null);
      setRolePermissionsPage("1");
      setRoleUsersPage("1");
    };
    fetchRolesData();
  }, [rolesPage, role]);
  const [assignPermissionModal, setAssignPermissionModal] = useState(false);
  const [createRoleModal, setCreateRoleModal] = useState(false);
  const [editRoleModal, setEditRoleModal] = useState(false);

  function onCloseCreateRoleModal() {
    setCreateRoleModal(false);
  }
  function onCloseEditRoleModal() {
    setEditRoleModal(false);
    setSelectedRoleId(null);
  }
  function onCloseAssignPermissionModal() {
    setAssignPermissionModal(false);
    setSelectedRoleId(null);
    setRoleId(null);
    setRole(null);
  }
  function onOpenAssignPermissionModal(role: Role) {
    setRole(role);
    setSelectedRoleId(role.id);
    setRoleId(role.id);
    setAssignPermissionModal(true);
  }

  const InitialRolesViewTable: IDynamicTable<Role> = {
    header: {
      title: "نقش ها",
      actions: [
        {
          name: "Create",
          caption: "ایجاد نقش",
          handler: () => {
            setCreateRoleModal(true);
          },
        },
      ],
    },
    data: roles ?? [],
    columns: [
      {
        header: "نام نقش",
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
        name: "Edit",
        caption: "ویرایش",
        icon: <FaPen />,
        color: "warning",
        className: "!rounded-l-none",
        handler: (row) => {
          setRole(row);
          setSelectedRoleId(null);
          setSelectedRoleId(row.id);
          setEditRoleModal(true);
        },
      },
      {
        name: "assignPermission",
        caption: "اختصاص مجوز",
        icon: <FaUserPen />,
        color: "primary",
        className: "!rounded-none",
        handler: (row) =>
          assignPermissionModal
            ? onCloseAssignPermissionModal()
            : onOpenAssignPermissionModal(row),
      },
      {
        name: "ShowRoleDetails",
        caption: "مشاهده ی جزییات",
        handler: (row: Role) => {
          setSelectedRoleId(row.id);
          setRoleId(row.id);
        },
        icon: <FaEye />,
        color: "info",
        className: "!rounded-r-none",
      },
    ],
    rowKey: "id",
    error: error?.toString(),
    loading: loading === DataStatus.PENDING,
    pagination: meta,
    actionCellClassName: "text-center",
    className: (row) => (row.id === selectedRoleId ? "!bg-bg-active " : ""),
  };
  return (
    <>
      <DynamicTable
        dynamicTable={InitialRolesViewTable}
        setPage={setRolesPage}
      />

      {role && (
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
    </>
  );
}
