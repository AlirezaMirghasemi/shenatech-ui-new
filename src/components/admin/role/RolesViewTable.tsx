"use client";
import DynamicTable from "@/components/admin/dynamics/dynamicTable/DynamicTable";
import { DataStatus } from "@/constants/data/DataStatus";
import { useRole } from "@/hooks/useRole";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
import { Role } from "@/types/Role";
import { useEffect, useState } from "react";
import {
  FaEye,
  FaPen,
  FaTrashCan,
  FaUserPen,
  FaUserPlus,
} from "react-icons/fa6";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import PersianDate from "persian-date";
import CreateRoleModal from "./CreateRoleModal";
import AssignPermissionModal from "./AssignPermissionModal";
import EditRoleModal from "./EditRoleModal";
import DeleteRoleModal from "./DeleteRoleModal";
import AssignRoleToUsersModal from "./AssignRoleToUsersModal";
export default function RolesViewTable({
  setRoleUsersPage,
  setRolePermissionsPage,
  ShowRoleDetails,
  role,
  setRole,
}: {
  setRoleUsersPage: (page: string) => void;
  setRolePermissionsPage: (page: string) => void;
  ShowRoleDetails: (role: Role) => void;
  role: Role | null;
  setRole: (role: Role | null) => void;
}) {
  const {
    roles,
    loading,
    error,
    meta,
    actions: { fetchRoles },
  } = useRole();
  const [rolesPage, setRolesPage] = useState("1");

  useEffect(() => {
    const fetchRolesData = async () => {
      await fetchRoles(rolesPage, "5");
      await setRolePermissionsPage("1");
      await setRoleUsersPage("1");
    };
    fetchRolesData();
  }, [rolesPage]);

  const [assignPermissionModal, setAssignPermissionModal] = useState(false);
  const [createRoleModal, setCreateRoleModal] = useState(false);
  const [editRoleModal, setEditRoleModal] = useState(false);
  const [deleteRoleModal, setDeleteRoleModal] = useState(false);
  const [assignRoleToUsersModal, setAssignRoleToUsersModal] = useState(false);
  function onCloseAssignRoleToUsersModal(role: Role) {
    setRole(role);
    setAssignRoleToUsersModal(false);
  }
  function onOpenAssignRoleToUsersModal(row: Role) {
    setRole(row);
    setAssignRoleToUsersModal(true);
  }
  function onOpenCreateRoleModal() {
    setCreateRoleModal(true);
  }
  function onCloseCreateRoleModal() {
    setCreateRoleModal(false);
    setRole(null);
  }
  function onOpenDeleteRoleModal(row: Role) {
    setRole(row);
    setDeleteRoleModal(true);
  }
  function onCloseDeleteRoleModal() {
    setDeleteRoleModal(false);
    setRole(null);
  }
  function onOpenEditRoleModal(row: Role) {
    setRole(row);
    setEditRoleModal(true);
  }
  function onCloseEditRoleModal() {
    setEditRoleModal(false);
  }
  function onCloseAssignPermissionModal(role: Role) {
    setRole(role);
    setAssignPermissionModal(false);
  }
  function onOpenAssignPermissionModal(role: Role) {
    setRole(role);
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
            onOpenCreateRoleModal();
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
          const date = row.updated_at
            ? new PersianDate(new Date(row.updated_at)).format(
                "HH:mm:ss - YYYY/MM/DD"
              )
            : "-";
          return date;
        },
      },
    ],
    actions: [
      {
        name: "ShowRoleDetails",
        caption: "مشاهده ی جزییات",
        handler: (row: Role) => {
          ShowRoleDetails(row);
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
        handler: (row) => onOpenAssignPermissionModal(row),
      },
      {
        name: "assignUser",
        caption: "تخصیص به کاربر",
        icon: <FaUserPlus />,
        color: "secondary",
        className: "!rounded-none",
        handler: (row) => onOpenAssignRoleToUsersModal(row),
      },
      {
        name: "Edit",
        caption: "ویرایش",
        icon: <FaPen />,
        color: "warning",
        className: "!rounded-none",
        handler: (row) => {
          onOpenEditRoleModal(row);
        },
      },
      {
        name: "Delete",
        caption: "حذف",
        icon: <FaTrashCan />,
        color: "danger",
        className: "!rounded-r-none",
        handler: (row) => {
          onOpenDeleteRoleModal(row);
        },
      },
    ],
    rowKey: "id",
    error: error?.toString(),
    loading: loading === DataStatus.PENDING,
    pagination: meta,
    actionCellClassName: "text-center",
    className: (row) => (row.id === role?.id ? "!bg-bg-active " : ""),
  };
  return (
    <>
      <DynamicTable
        dynamicTable={InitialRolesViewTable}
        setPage={setRolesPage}
      />

      {role && (
        <>
          <AssignPermissionModal
            assignPermissionModal={assignPermissionModal}
            onCloseAssignPermissionModal={onCloseAssignPermissionModal}
            role={role}
            ShowRoleDetails={ShowRoleDetails}
          />
          <EditRoleModal
            editRoleModal={editRoleModal}
            onCloseEditRoleModal={onCloseEditRoleModal}
            role={role}
          />
          <DeleteRoleModal
            deleteRoleModal={deleteRoleModal}
            role={role}
            onCloseDeleteRoleModal={onCloseDeleteRoleModal}
          />
          <AssignRoleToUsersModal
            assignRoleToUsersModal={assignRoleToUsersModal}
            onCloseAssignRoleToUsersModal={onCloseAssignRoleToUsersModal}
            role={role}
            ShowRoleDetails={ShowRoleDetails}
          />
        </>
      )}
      <CreateRoleModal
        createRoleModal={createRoleModal}
        onCloseCreateRoleModal={onCloseCreateRoleModal}
      />
    </>
  );
}
