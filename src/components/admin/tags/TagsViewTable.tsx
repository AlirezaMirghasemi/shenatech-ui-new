import { Tag } from "@/types/Tag";
import { useEffect, useRef, useState } from "react";
import { useTag } from "@/hooks/useTag";
import CreateTagModal from "./CreateTagModal";
import TagsViewTableInitials from "./Initials/TagsViewTableInitials";
import DynamicTable from "../dynamics/dynamicTable/DynamicTable";
import DeleteTagsModal from "./DeleteTagsModal";
import useTable from "@/hooks/useTable";
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
  const handleTable=useTable<Tag>();
  const [tagsPage, setTagsPage] = useState("1");
  const [tagsSearchedPage, setTagsSearchedPage] = useState("1");
  const [searchValue, setSearchValue] = useState<string>("");

  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const fetchTagsData = async () => {
      if (searchValue != "") {
        await fetchTags({
          search: searchValue,
          page: tagsSearchedPage,
          perPage: "5",
        });
        searchRef.current?.focus();
        setTagsPage("1");
      } else {
        await fetchTags({ search: "", page: tagsPage, perPage: "5" });
        setTagsSearchedPage("1");
      }
    };
    fetchTagsData();
  }, [tagsPage, tagsSearchedPage, searchValue]);

  const [createTagModal, setCreateTagModal] = useState(false);
  const [editTagModal, setEditTagModal] = useState(false);
  const [deleteTagsModal, setDeleteTagsModal] = useState(false);

  function onCloseCreateTagModal() {
    setCreateTagModal(false);
    setTag(null);
  }

  //   function onCloseEditTagModal() {
  //     setEditTagModal(false);
  //   }
  function onCloseDeleteTagsModal() {
    setDeleteTagsModal(false);
    handleTable.handleSelect.setSelectedIds(new Set([]));
  }

  return (
    <>
      <DynamicTable
        dynamicTable={TagsViewTableInitials({
          tag,
          searchValue,
          ShowTagDetails,
          setTag,
          setEditTagModal,
          setDeleteTagsModal,
          setCreateTagModal,
          setSearchValue,
          searchRef,
          handleTable
        })}
        setPage={setTagsPage}
        handleTable={handleTable}
      />
      <CreateTagModal
        createTagModal={createTagModal}
        onCloseCreateTagModal={onCloseCreateTagModal}
      />

        <>
          {/* <EditTagModal
            editTagModal={editTagModal}
            onCloseEditTagModal={onCloseEditTagModal}
            tag={tag}
          /> */}
          <DeleteTagsModal
            deleteTagsModal={deleteTagsModal}
            selectedIds={handleTable.handleSelect.selectedIds}
            onCloseDeleteTagsModal={onCloseDeleteTagsModal}
          />
        </>
    </>
  );
}
