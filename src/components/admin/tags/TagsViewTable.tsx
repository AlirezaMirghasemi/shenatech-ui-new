import { Tag } from "@/types/Tag";
import { useEffect, useRef, useState } from "react";
import DynamicTable from "../dynamics/DynamicTable";
import { useTag } from "@/hooks/useTag";
import CreateTagModal from "./CreateTagModal";
import TagsViewTableInitials from "./Initials/TagsViewTableInitials";
export default function TagsViewTable({
  tag,
  setTag,
  ShowTagDetails,
}: {
  tag: Tag | null;
  setTag: (tag: Tag | null) => void;
  ShowTagDetails: (tag: Tag) => void;
}) {
  const {
    actions: { fetchTags },
  } = useTag();
  const [tagsPage, setTagsPage] = useState("1");
  const [tagsSearchedPage, setTagsSearchedPage] = useState("1");
  const [searchValue, setSearchValue] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const fetchTagsData = async () => {
      if (searchValue != "") {
        await fetchTags(searchValue, tagsSearchedPage, "5");
        searchRef.current?.focus();
        setTagsPage("1");
      } else {
        await fetchTags("", tagsPage, "5");
        setTagsSearchedPage("1");
      }
    };
    fetchTagsData();
  }, [tagsPage, tagsSearchedPage, searchValue]);

  const [createTagModal, setCreateTagModal] = useState(false);
  const [editTagModal, setEditTagModal] = useState(false);
  const [deleteTagModal, setDeleteTagModal] = useState(false);

  function onCloseCreateTagModal() {
    setCreateTagModal(false);
    setTag(null);
  }

  //   function onCloseEditTagModal() {
  //     setEditTagModal(false);
  //   }
  //   function onCloseDeleteTagModal() {
  //     setDeleteTagModal(false);
  //     setTag(null);
  //   }

  return (
    <>
      <DynamicTable
        dynamicTable={TagsViewTableInitials({
          tag,
          searchValue,
          ShowTagDetails,
          setTag,
          setEditTagModal,
          setDeleteTagModal,
          setCreateTagModal,
          setSearchValue,
          searchRef,
        })}
        setPage={setTagsPage}
      />
      <CreateTagModal
        createTagModal={createTagModal}
        onCloseCreateTagModal={onCloseCreateTagModal}
      />
      {/* {tag && (
        <>
          <EditTagModal
            editTagModal={editTagModal}
            onCloseEditTagModal={onCloseEditTagModal}
            tag={tag}
          />
          <DeleteTagModal
            deleteTagModal={deleteTagModal}
            tag={tag}
            onCloseDeleteTagModal={onCloseDeleteTagModal}
          />
        </>
      )} */}
    </>
  );
}
