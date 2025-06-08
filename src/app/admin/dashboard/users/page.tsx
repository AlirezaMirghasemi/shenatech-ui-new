"use client";
import UsersViewTable from "@/components/admin/user/UsersViewTable";
import { User } from "@/types/User";
import { TabItem, Tabs } from "flowbite-react";
import { useState } from "react";
import { FaFileContract } from "react-icons/fa6";

export default function UsersPage() {
  const [user, setUser] = useState<User | null>(null);
  const showUserDetails = (user: User) => {
    setUser(user);
  };
  return (
    <>
      <UsersViewTable user={user} setUser={setUser} showUserDetails={showUserDetails} />
      {user && (
        <Tabs variant="fullWidth">
          <TabItem title="فعالیت ها" icon={FaFileContract}>
            <h4>لیست فعالیت ها</h4>
          </TabItem>
        </Tabs>
      )}
    </>
  );
}
