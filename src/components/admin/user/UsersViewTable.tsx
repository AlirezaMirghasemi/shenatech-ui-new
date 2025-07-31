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
import RestoreUsersModal from "./RestoreUsersModal";
import { TabItem, Tabs } from "flowbite-react";
import { FaFileContract } from "react-icons/fa6";
import { ModalData, ModalType, ModalTypeValue } from "@/constants/data/Modal";
import UserRolesTable from "./UserRolesTable";
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
    handleTable.handleSelect.clearRowData();
    handleTable.handleSelect.setParentData({} as User);
  }, [currentPage, searchValue]);

  const actionContext = {
    setSelectedIds: handleTable.handleSelect.setSelectedIds,
    setSelectedRows: handleTable.handleSelect.setSelectedRows,
    selectedIds: handleTable.handleSelect.selectedIds,
    selectedRows: handleTable.handleSelect.selectedRows,
    data: handleTable.handleSelect.data,
    setData: handleTable.handleSelect.setData,
    parentData: handleTable.handleSelect.parentData,
    setParentData: ( { id, status }:{ id: number; status: string }) =>
      handleTable.handleSelect.setParentData(),
    openModal: (modal: ModalTypeValue, data: ModalData<User>) => {
      openModal(modal, data);
    },
  };
  //   const userViewTableInitials = UsersViewTableInitials({
  //     searchValue,
  //     setSearchValue,
  //     searchRef,
  //     users,
  //     meta,
  //     loading,
  //     error,
  //     actionContext,
  //   });

  return (
    <>
      <DynamicTable
        dynamicTable={UsersViewTableInitials({
          searchValue,
          setSearchValue,
          searchRef,
          users,
          meta,
          loading,
          error,
          actionContext,
        })}
        setPage={setCurrentPage}
        handleTable={handleTable}
        actionContext={actionContext}
      />

      <CreateUserModal
        createUserModal={modals.commonModal.create}
        onCloseCreateUserModal={() =>
          closeModal(ModalType.commonModalType.create)
        }
      />

      {handleTable.handleSelect.selectedRows.length != 0 && (
        <>
          <UserProfileModal
            user={handleTable.handleSelect.selectedRows[0]}
            onClose={() => {
              closeModal(ModalType.commonModalType.detail);
              actionContext.setSelectedIds(new Set<number>());
            }}
            userProfileModal={modals.commonModal.detail}
          />
          <EditUserModal
            editUserModal={modals.commonModal.edit}
            onCloseEditUserModal={() => {
              closeModal(ModalType.commonModalType.edit);
              actionContext.setSelectedIds(new Set<number>());
            }}
            user={handleTable.handleSelect.selectedRows[0]}
          />
          <DeleteUserModal
            deleteUserModal={modals.commonModal.delete}
            onCloseDeleteUserModal={() => {
              closeModal(ModalType.commonModalType.delete);
              actionContext.setSelectedIds(new Set<number>());
            }}
            user={handleTable.handleSelect.selectedRows[0]}
          />
          <RestoreUsersModal
            restoreUsersModal={modals.commonModal.restores}
            selectedIds={
              (modalData as { selectedIds?: Set<number> })?.selectedIds ||
              new Set<number>()
            }
            onCloseRestoreUsersModal={() => {
              closeModal(ModalType.commonModalType.restores);
              actionContext.setSelectedIds(new Set<number>());
              actionContext.setSelectedRows([]);
            }}
            selectedUsers={handleTable.handleSelect.selectedRows}
          />
          <RestoreUsersModal
            restoreUsersModal={modals.commonModal.restore}
            selectedIds={
              (modalData as { selectedIds?: Set<number> })?.selectedIds ||
              new Set<number>()
            }
            onCloseRestoreUsersModal={() => {
              closeModal(ModalType.commonModalType.restore);
              actionContext.setSelectedIds(new Set<number>());
              actionContext.setSelectedRows([]);
            }}
            selectedUsers={handleTable.handleSelect.selectedRows}
          />
        </>
      )}
      {Object.keys(handleTable.handleSelect.data).length != 0 && (
        <>
          <Tabs variant="fullWidth" className="p-0">
            <TabItem title="نقش های کاربر" icon={FaFileContract}>
              <UserRolesTable user={handleTable.handleSelect.data} />
            </TabItem>
          </Tabs>
        </>
      )}
    </>
  );
}
