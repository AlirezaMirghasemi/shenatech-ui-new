"use client";
import PermissionRolesViewTable from "@/components/admin/permission/PermissionRolesViewTable";
import PermissionsViewTable from "@/components/admin/permission/PermissionsViewTable";
import { TabItem, Tabs } from "flowbite-react";
import { useState } from "react";
import { FaBuildingShield, FaUsersGear } from "react-icons/fa6";

export default function PermissionsPage() {
  const [permissionId, setPermissionId] = useState<number | null>(null);
  const [permissionRolesPage, setPermissionRolesPage] = useState("1");
  const [permissionUsersPage, setPermissionUsersPage] = useState("1");
  return (
    <>
      <PermissionsViewTable
        setPermissionId={setPermissionId}
        setPermissionRolesPage={setPermissionRolesPage}
        setPermissionUsersPage={setPermissionUsersPage}
      />
      <Tabs variant="underline">
        <TabItem active title="نقش ها" icon={FaBuildingShield}>
          <PermissionRolesViewTable
            permissionId={permissionId ? permissionId : null}
            setPermissionRolesPage={setPermissionRolesPage}
            permissionRolesPage={permissionRolesPage}
          />
        </TabItem>
        <TabItem title="کاربران" icon={FaUsersGear}>
          {/* <RoleUsersViewTable
            roleId={roleId ? roleId : null}
            setRoleUsersPage={setRoleUsersPage}
            roleUsersPage={roleUsersPage}
          /> */}
        </TabItem>
      </Tabs>
    </>
  );
}
