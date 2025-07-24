"use client";
import DynamicTable from "@/components/admin/dynamics/dynamicTable/DynamicTable";

import { useEffect, useRef, useState } from "react";
import { User } from "@/types/User";
import { useUser } from "@/hooks/useUser";
import UserProfileModal from "./UserProfileModal";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import UsersViewTableInitials from "./Initials/UsersViewTableInitials";
import useTable from "@/hooks/useTable";
import { useTableState } from "@/hooks/useTableState";
import { ModalData, ModalType } from "@/constants/data/ModalType";
export default function UsersViewTable() {
  const {
    actions: { fetchUsers },
    users,
    error,
    loading,
    meta,
  } = useUser();

  const handleTable = useTable<User>();
  const { modals, modalData, openModal, closeModal } = useTableState();
  const [currentPage, setCurrentPage] = useState("1");
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchUsers({ search: searchValue, page: currentPage, perPage: "10" });
  }, [currentPage, searchValue]);
  useEffect(() => {
    handleTable.handleSelect.clearSelection();
  }, [currentPage, searchValue]);

  const actionContext = {
    setSelectedIds: handleTable.handleSelect.setSelectedIds,
    setSelectedRows: handleTable.handleSelect.setSelectedRows,
    selectedIds: handleTable.handleSelect.selectedIds,
    selectedRows: handleTable.handleSelect.selectedRows,
    openModal: (modal: ModalType, data: ModalData<User>) => {
      openModal(modal, data);
    },
  };
  const tableConfig = UsersViewTableInitials({
    searchValue,
    setSearchValue,
    searchRef,
    users,
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

      <CreateUserModal
        createUserModal={modals.create}
        onCloseCreateUserModal={() => closeModal("create")}
      />

      {handleTable.handleSelect.selectedRows[0] && (
        <>
          <UserProfileModal
            user={handleTable.handleSelect.selectedRows[0]}
            onClose={() => {
              closeModal("detail");
              actionContext.setSelectedIds(new Set<number>());
            }}
            userProfileModal={modals.detail}
          />
          <EditUserModal
            editUserModal={modals.edit}
            onCloseEditUserModal={() => {
              closeModal("edit");
              actionContext.setSelectedIds(new Set<number>());
            }}
            user={handleTable.handleSelect.selectedRows[0]}
          />
          <DeleteUserModal
            deleteUserModal={modals.delete}
            onCloseDeleteUserModal={() => {
              closeModal("delete");
              actionContext.setSelectedIds(new Set<number>());
            }}
            user={handleTable.handleSelect.selectedRows[0]}
          />

        </>
      )}
    </>
  );
}
