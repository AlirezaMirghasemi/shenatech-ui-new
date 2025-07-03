"use client";
import TagsViewTable from "@/components/admin/tags/TagsViewTable";
import { Tag } from "@/types/Tag";
import { useState } from "react";

export default function TagsPage() {
  const [tag, setTag] = useState<Tag | null>(null);
  const ShowTagDetails = (tag: Tag) => {
    setTag(tag);
  };
  return (
    <>
      <TagsViewTable
        //setRolePermissionsPage={setRolePermissionsPage}
        //setRoleUsersPage={setRoleUsersPage}
        ShowTagDetails={ShowTagDetails}
        tag={tag}
        setTag={setTag}
      />
    </>
  );
}
