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
    tags,
    meta,
    loading,
    error,

  } = useTag();

  const handleTable = useTable<Tag>();
 const [currentPage, setCurrentPage] = useState("1");
  const [searchValue, setSearchValue] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);


   useEffect(() => {
    const fetchTagsData = async () => {
      await fetchTags({
        search: searchValue,
        page: currentPage,
        perPage: "5",
      });
    };
    fetchTagsData();
  }, [currentPage, searchValue]);

  const [createTagModal, setCreateTagModal] = useState(false);
  const [editTagModal, setEditTagModal] = useState(false);
  const [deleteTagsModal, setDeleteTagsModal] = useState(false);

  function onCloseCreateTagModal() {
    setCreateTagModal(false);
    setTag(null);
  }

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
          handleTable,
          tags,
          meta,
          loading,
          error,
        })}
        setPage={setCurrentPage}
        handleTable={handleTable}
      />
      <CreateTagModal
        createTagModal={createTagModal}
        onCloseCreateTagModal={onCloseCreateTagModal}
      />
      <DeleteTagsModal
        deleteTagsModal={deleteTagsModal}
        selectedIds={handleTable.handleSelect.selectedIds}
        onCloseDeleteTagsModal={onCloseDeleteTagsModal}
      />
    </>
  );
}
