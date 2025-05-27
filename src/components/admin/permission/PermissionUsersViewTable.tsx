import DynamicTable from "@/components/admin/dynamics/DynamicTable";
import { DataStatus } from "@/constants/data/DataStatus";
import { useUser } from "@/hooks/useUser";
import { IDynamicTable } from "@/interfaces/IDynamicTable";
import { User } from "@/types/User";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import PersianDate from "persian-date";
import { useEffect } from "react";

export default function PermissionUsersViewTable({
  permissionId,
  setPermissionUsersPage,
  permissionUsersPage,
}: {
  permissionId: number | null;
  setPermissionUsersPage: (page: string) => void;
  permissionUsersPage: string;
}) {
  const {
    users,
    meta,
    error,
    loading,
    actions: { fetchPermissionUsers },
  } = useUser();
  useEffect(() => {
    const fetchPermissionUsersData = async () => {
      if (permissionId) {
        await fetchPermissionUsers(permissionId, "10", permissionUsersPage);
      }
    };
    fetchPermissionUsersData();
  }, [permissionId, permissionUsersPage]);
  const InitialPermissionUsersViewTable: IDynamicTable<User> = {
    header: {
      title: "کاربران نقش",
    },
    data: permissionId && users ? users : [],
    columns: [
      {
        className:"text-center",
        header: "نام کاربری",
        accessor: "username",
      },
      {
        className:"text-center",
        header: "پست الکترونیکی",
        accessor: "email",
      },
      {
        className:"text-center",
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
        className:"text-center",
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
        dynamicTable={InitialPermissionUsersViewTable}
        setPage={setPermissionUsersPage}
      />
    </>
  );
}
