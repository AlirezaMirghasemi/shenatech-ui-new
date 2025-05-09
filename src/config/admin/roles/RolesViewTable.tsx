"use client";
import DynamicTable from "@/components/admin/dynamics/DynamicTable";
import { DataStatus } from "@/constants/data/DataStatus";
import { useRole } from "@/hooks/useRole";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
import { Role } from "@/types/Role";
import { useEffect, useState } from "react";
import { FaEye, FaPen } from "react-icons/fa6";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import PersianDate from "persian-date";
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

  useEffect(() => {
    const fetchRolesData = async () => {
      await setRoleId(null);
      await setRolePermissionsPage("1");
      await setRoleUsersPage("1");
      await fetchRoles(rolesPage, "1");
    };
    fetchRolesData();
  }, [rolesPage,setRoleId]);
  const InitialRolesViewTable: IDynamicTable<Role> = {
    header: {
      title: "نقش ها",
      actions: [{ name: "Create", caption: "ایجاد نقش", handler: () => {} }],
    },
    data: roles,
    columns: [
      {
        header: "نام نقش",
        accessor: "name",
      },
      {
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
    actions: [
      {
        name: "Edit",
        caption: "ویرایش",
        icon: <FaPen />,
      },
      {
        name: "ShowRoleDetails",
        caption: "مشاهده ی جزییات",
        handler: async (row) => {
          await setRoleId(row.id);
        },
        icon: <FaEye />,
      },
    ],
    rowKey: "id",
    error: error?.toString(),
    loading: loading === DataStatus.PENDING,
    pagination: meta,
  };
  return (
    <>
      <DynamicTable
        dynamicTable={InitialRolesViewTable}
        setPage={setRolesPage}
      />
    </>
  );
}
