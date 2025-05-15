"use client";
import RolePermissionsViewTable from "@/components/admin/role/RolePermissionsViewTable";
import RolesViewTable from "@/components/admin/role/RolesViewTable";
import RoleUsersViewTable from "@/components/admin/role/RoleUsersViewTable";
import { TabItem, Tabs } from "flowbite-react";
import { useState } from "react";
import { FaUserLock, FaUsersGear } from "react-icons/fa6";

export default function RolesPage() {
  const [roleId,setRoleId]=useState<number | null>(null);
  const [rolePermissionsPage, setRolePermissionsPage] = useState("1");
  const [roleUsersPage, setRoleUsersPage] = useState("1");

  return (
    <>
      <RolesViewTable
        setRoleId={setRoleId}
        setRolePermissionsPage={setRolePermissionsPage}
        setRoleUsersPage={setRoleUsersPage}
      />
      <Tabs
        variant="fullWidth"
        className=" mt-5 max-w-[85rem]  sm:px-2   mx-auto  "
      >
        <TabItem
          active
          title="مجوز ها"
          icon={FaUserLock}
          className="cursor-pointer"
        >
          <RolePermissionsViewTable
            roleId={roleId ? roleId : null}
            setRolePermissionsPage={setRolePermissionsPage}
            rolePermissionsPage={rolePermissionsPage}
          />
        </TabItem>
        <TabItem title="کاربران" icon={FaUsersGear} className="cursor-pointer">
          <RoleUsersViewTable
            roleId={roleId ? roleId : null}
            setRoleUsersPage={setRoleUsersPage}
            roleUsersPage={roleUsersPage}
          />
        </TabItem>
      </Tabs>
    </>
  );
}
