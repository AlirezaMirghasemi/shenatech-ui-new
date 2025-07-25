import { useState, useEffect, useRef } from "react";
import { Tag } from "@/types/Tag";
import CreateTagModal from "./CreateTagModal";
import DeleteTagsModal from "./DeleteTagsModal";
import { useTag } from "@/hooks/useTag";
import { useTableState } from "@/hooks/useTableState";
import useTable from "@/hooks/useTable";
import TagsViewTableInitials from "./Initials/TagsViewTableInitials";
import DynamicTable from "../dynamics/dynamicTable/DynamicTable";
import { ModalData, ModalType } from "@/constants/data/ModalType";
import RestoreTagsModal from "./RestoreTagsModal";

export default function TagsViewTable() {
  const {
    actions: { fetchTags },
    tags,
    meta,
    loading,
    error,
  } = useTag();
  const handleTable = useTable<Tag>();
  const { modals, modalData, openModal, closeModal } = useTableState();
  const [currentPage, setCurrentPage] = useState("1");
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  //   const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  useEffect(() => {
    fetchTags({ search: searchValue, page: currentPage, perPage: "10" });
  }, [currentPage, searchValue]);

  useEffect(() => {
    handleTable.handleSelect.clearSelection();
  }, [currentPage, searchValue]);

  const actionContext = {
    setSelectedIds: handleTable.handleSelect.setSelectedIds,
    setSelectedRows: handleTable.handleSelect.setSelectedRows,
    selectedIds: handleTable.handleSelect.selectedIds,
    selectedRows: handleTable.handleSelect.selectedRows,
    openModal: (modal: ModalType, data: ModalData<Tag>) => {
      openModal(modal, data);
    },
  };

  const tableConfig = TagsViewTableInitials({
    searchValue,
    setSearchValue,
    searchRef,
    tags,
    meta,
    loading,
    error,
    actionContext,
  });

  return (
    <>
      <DynamicTable
        dynamicTable={tableConfig}
        setPage={setCurrentPage}
        handleTable={handleTable}
        actionContext={actionContext}
      />

      <CreateTagModal
        createTagModal={modals.create}
        onCloseCreateTagModal={() => closeModal("create")}
      />

      <DeleteTagsModal
        deleteTagsModal={modals.delete}
        selectedIds={
          (modalData as { selectedIds?: Set<number> })?.selectedIds ||
          new Set<number>()
        }
        onCloseDeleteTagsModal={() => {
          closeModal("delete");
          actionContext.setSelectedIds(new Set<number>());
          actionContext.setSelectedRows([]);
        }}
        selectedTags={handleTable.handleSelect.selectedRows}
      />
      <RestoreTagsModal
        restoreTagsModal={modals.restore}
        selectedIds={
          (modalData as { selectedIds?: Set<number> })?.selectedIds ||
          new Set<number>()
        }
        onCloseRestoreTagsModal={() => {
          closeModal("restore");
          actionContext.setSelectedIds(new Set<number>());
          actionContext.setSelectedRows([]);
        }}
        selectedTags={handleTable.handleSelect.selectedRows}
      />
    </>
  );
}
