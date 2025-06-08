"use client";
import PermissionRolesViewTable from "@/components/admin/permission/PermissionRolesViewTable";
import PermissionsViewTable from "@/components/admin/permission/PermissionsViewTable";
import PermissionUsersViewTable from "@/components/admin/permission/PermissionUsersViewTable";
import { Permission } from "@/types/Permission";
import { TabItem, Tabs } from "flowbite-react";
import { useState } from "react";
import { FaBuildingShield, FaUsersGear } from "react-icons/fa6";

export default function PermissionsPage() {
  const [permissionRolesPage, setPermissionRolesPage] = useState("1");
  const [permissionUsersPage, setPermissionUsersPage] = useState("1");
  const [permission, setPermission] = useState<Permission | null>(null);
  const ShowPermissionDetails = (permission: Permission) => {
    setPermission(permission);
    setPermissionUsersPage("1");
    setPermissionRolesPage("1");
  };
  return (
    <>
      <PermissionsViewTable
        setPermissionRolesPage={setPermissionRolesPage}
        setPermissionUsersPage={setPermissionUsersPage}
        ShowPermissionDetails={ShowPermissionDetails}
        permission={permission}
        setPermission={setPermission}
      />
      {permission?.id && (
        <Tabs variant="underline">
          <TabItem active title="نقش ها" icon={FaBuildingShield}>
            <PermissionRolesViewTable
              permission={permission}
              setPermissionRolesPage={setPermissionRolesPage}
              permissionRolesPage={permissionRolesPage}
            />
          </TabItem>
          <TabItem title="کاربران" icon={FaUsersGear}>
            <PermissionUsersViewTable
              permission={permission}
              setPermissionUsersPage={setPermissionUsersPage}
              permissionUsersPage={permissionUsersPage}
            />
          </TabItem>
        </Tabs>
      )}
    </>
  );
}
