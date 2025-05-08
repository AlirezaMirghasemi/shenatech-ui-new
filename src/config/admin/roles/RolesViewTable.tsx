"use client";
import DynamicTable from "@/components/admin/dynamics/DynamicTable";
import { DataStatus } from "@/constants/data/DataStatus";
import { useRole } from "@/hooks/useRole";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
import { Role } from "@/types/Role";
import { useEffect } from "react";
import { FaPen } from "react-icons/fa6";

export default function RolesViewTable() {
  const {
    roles,
    loading,
    error,
    actions: { fetchRoles },
  } = useRole();
  useEffect(() => {
    const fetchRolesData = async () => {
      await fetchRoles();
    };
    fetchRolesData();
  }, []);
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
    ],
    actions: [
      {
        name: "Edit",
        caption: "ویرایش",
        icon: <FaPen />,
      },
    ],
    rowKey: "id",
    error: error?.toString(),
    loading: loading === DataStatus.PENDING,
  };
  return (
    <>
      <DynamicTable dynamicTable={InitialRolesViewTable} />
    </>
  );
}
