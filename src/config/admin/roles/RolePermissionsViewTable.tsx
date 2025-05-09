"use client";
import DynamicTable from "@/components/admin/dynamics/DynamicTable";

import { Permission } from "../../../types/Permission";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import PersianDate from "persian-date";
import { useEffect } from "react";
import { usePermission } from "@/hooks/usePermission";
import { DataStatus } from "@/constants/data/DataStatus";

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
    permissions,
    meta,
    error,
    loading,
    actions: { fetchRolePermissions },
  } = usePermission();
  useEffect(() => {
    const fetchRolePermissionsData = async () => {
      if (roleId) {
        await fetchRolePermissions(roleId, "10", rolePermissionsPage);
      }
    };
    fetchRolePermissionsData();
  }, [roleId, rolePermissionsPage]);

  const InitialRolePermissionsViewTable: IDynamicTable<Permission> = {
    header: {
      title: "مجوز های نقش",
    },
    data: roleId && permissions ? permissions : [],
    columns: [
      {
        header: "نام مجوز",
        accessor: "name",
      },
      {
        header: "نام گارد",
        accessor: "guard_name",
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
    rowKey: "id",
    error: error?.toString(),
    loading: loading === DataStatus.PENDING,
    pagination: meta,
  };
  return (
    <>
      <DynamicTable
        dynamicTable={InitialRolePermissionsViewTable}
        setPage={setRolePermissionsPage}
      />
    </>
  );
}
