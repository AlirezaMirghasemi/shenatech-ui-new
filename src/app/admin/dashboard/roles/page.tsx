"use client";
import RolePermissionsViewTable from "@/components/admin/role/RolePermissionsViewTable";
import RolesViewTable from "@/components/admin/role/RolesViewTable";
import RoleUsersViewTable from "@/components/admin/role/RoleUsersViewTable";
import { Role } from "@/types/Role";
import { TabItem, Tabs } from "flowbite-react";
import { useState } from "react";
import { FaUserLock, FaUsersGear } from "react-icons/fa6";

export default function RolesPage() {
  //const [roleId, setRoleId] = useState<number | null>(null);
  const [rolePermissionsPage, setRolePermissionsPage] = useState("1");
  const [roleUsersPage, setRoleUsersPage] = useState("1");
  const [role, setRole] = useState<Role | null>(null);
  const ShowRoleDetails = (role: Role) => {
    //setRoleId(role.id);
    setRole(role);
    setRoleUsersPage("1");
    setRolePermissionsPage("1");
  };
  return (
    <>
      <RolesViewTable
        setRolePermissionsPage={setRolePermissionsPage}
        setRoleUsersPage={setRoleUsersPage}
        ShowRoleDetails={ShowRoleDetails}
        role={role}
        setRole={setRole}
      />
      {role?.id && (
      <Tabs variant="fullWidth">
        <TabItem active title="مجوز ها" icon={FaUserLock}>
          <RolePermissionsViewTable
          role={role}
            setRolePermissionsPage={setRolePermissionsPage}
            rolePermissionsPage={rolePermissionsPage}
          />
        </TabItem>
        <TabItem title="کاربران" icon={FaUsersGear}>
          <RoleUsersViewTable
            role={role}
            setRoleUsersPage={setRoleUsersPage}
            roleUsersPage={roleUsersPage}
          />
        </TabItem>
      </Tabs>
       )}
    </>
  );
}
//TODO: correct show role details
