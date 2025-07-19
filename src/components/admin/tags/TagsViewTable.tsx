import { Tag } from "@/types/Tag";
import { useEffect, useRef, useState } from "react";
import { useTag } from "@/hooks/useTag";
import CreateTagModal from "./CreateTagModal";
import TagsViewTableInitials from "./Initials/TagsViewTableInitials";
import DynamicTable from "../dynamics/dynamicTable/DynamicTable";
import DeleteTagsModal from "./DeleteTagsModal";
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
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set([]));
  const [selectedRows, setSelectedRows] = useState<Tag[]>([]);

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
    setSelectedIds(new Set([]));
    console.log(selectedRows);
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
          selectedIds,
          setSelectedIds,
          selectedRows,
          setSelectedRows,
        })}
        setPage={setTagsPage}
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
            selectedIds={selectedIds}
            onCloseDeleteTagsModal={onCloseDeleteTagsModal}
          />
        </>
    </>
  );
}
