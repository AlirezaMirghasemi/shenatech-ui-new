"use client";
import UsersViewTable from "@/components/admin/user/UsersViewTable";
import { TabItem, Tabs } from "flowbite-react";
import { useState } from "react";
import { FaFileContract } from "react-icons/fa6";

export default function UsersPage() {
  const [userId, setUserId] = useState<number | null>(null);

  return (
    <>
      <UsersViewTable setUserId={setUserId} />
      {userId && (
        <Tabs variant="fullWidth">
          <TabItem title="فعالیت ها" icon={FaFileContract}>
            <h4>لیست فعالیت ها</h4>
          </TabItem>
        </Tabs>
      )}
    </>
  );
}
