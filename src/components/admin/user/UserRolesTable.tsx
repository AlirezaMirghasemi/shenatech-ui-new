"use client";
import DynamicTable from "@/components/admin/dynamics/dynamicTable/DynamicTable";

import { useEffect, useRef, useState } from "react";
import { User } from "@/types/User";

import useTable from "@/hooks/useTable";
//import { ModalData, ModalType, ModalTypeValue } from "@/constants/data/Modal";
import { Role } from "@/types/Role";
import UserRolesTableInitials from "./Initials/UserRolesTableInitials";
import { PaginatedResponse } from "@/types/Api";
import { useUserRoles } from "@/hooks/useUserRoles";
import { ModalData, ModalTypeValue } from "@/constants/data/Modal";
import { useTableState } from "@/hooks/useTableState";
export default function UserRolesTable({ user }: { user: User }) {
  const {
    actions: { fetchUserRoles },
    userRoles,
    error,
    meta,
    statuses: { isFetching },
  } = useUserRoles();

  const handleTable = useTable<Role>();
  const { modals, modalData, openModal, closeModal } = useTableState();
  const [currentPage, setCurrentPage] = useState("1");
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user.id) {
      fetchUserRoles({
        userId: user.id,
        search: searchValue,
        page: currentPage,
        perPage: "10",
      });
    }
  }, [currentPage, searchValue, user.id]);
  useEffect(() => {
    handleTable.handleSelect.clearSelection();
    handleTable.handleSelect.clearRowData();
  }, [currentPage, searchValue]);

  useEffect(() => {
    console.log("UserRolesTable mounted with user:", user);
  }, [user]);

  useEffect(() => {
    console.log("User roles data:", userRoles);
    console.log("Error:", error);
    console.log("Loading:", isFetching);
  }, [userRoles, error, isFetching]);

    const actionContext = {
      setSelectedIds: handleTable.handleSelect.setSelectedIds,
      setSelectedRows: handleTable.handleSelect.setSelectedRows,
      selectedIds: handleTable.handleSelect.selectedIds,
      selectedRows: handleTable.handleSelect.selectedRows,
      data: handleTable.handleSelect.data,
      setData: handleTable.handleSelect.setData,
      openModal: (modal: ModalTypeValue, data: ModalData<Role,object>) => {
        openModal(modal, data as ModalData<Role,User>);
      },
    };

  return (
    <>
      <DynamicTable
        dynamicTable={UserRolesTableInitials({
          searchValue,
          setSearchValue,
          searchRef,
          userRoles: userRoles || [],
          meta: meta || ({} as PaginatedResponse<Role>),
          loading: isFetching,
          error,
          actionContext,
        })}
        setPage={setCurrentPage}
        handleTable={handleTable}
      />

      {/* <CreateUserModal
        createUserModal={modals.CommonModalState.create}
        onCloseCreateUserModal={() =>
          closeModal(ModalType.CommonModalType.CREATE)
        }
      /> */}

      {/* {handleTable.handleSelect.selectedRows.length != 0 && (
        <>
          <UserProfileModal
            user={handleTable.handleSelect.selectedRows[0]}
            onClose={() => {
              closeModal(ModalType.CommonModalType.DETAIL);
              actionContext.setSelectedIds(new Set<number>());
            }}
            userProfileModal={modals.CommonModalState.detail}
          />
          <EditUserModal
            editUserModal={modals.CommonModalState.edit}
            onCloseEditUserModal={() => {
              closeModal(ModalType.CommonModalType.EDIT);
              actionContext.setSelectedIds(new Set<number>());
            }}
            user={handleTable.handleSelect.selectedRows[0]}
          />
          <DeleteUserModal
            deleteUserModal={modals.CommonModalState.delete}
            onCloseDeleteUserModal={() => {
              closeModal(ModalType.CommonModalType.DELETE);
              actionContext.setSelectedIds(new Set<number>());
            }}
            user={handleTable.handleSelect.selectedRows[0]}
          />
          <RestoreUsersModal
            restoreUsersModal={modals.CommonModalState.restores}
            selectedIds={
              (modalData as { selectedIds?: Set<number> })?.selectedIds ||
              new Set<number>()
            }
            onCloseRestoreUsersModal={() => {
              closeModal(ModalType.CommonModalType.RESTORES);
              actionContext.setSelectedIds(new Set<number>());
              actionContext.setSelectedRows([]);
            }}
            selectedUsers={handleTable.handleSelect.selectedRows}
          />
          <RestoreUsersModal
            restoreUsersModal={modals.CommonModalState.restore}
            selectedIds={
              (modalData as { selectedIds?: Set<number> })?.selectedIds ||
              new Set<number>()
            }
            onCloseRestoreUsersModal={() => {
              closeModal(ModalType.CommonModalType.RESTORE);
              actionContext.setSelectedIds(new Set<number>());
              actionContext.setSelectedRows([]);
            }}
            selectedUsers={handleTable.handleSelect.selectedRows}
          />
        </>
      )} */}
      {/* {Object.keys(handleTable.handleSelect.data).length != 0 && (
        <>
          <Tabs variant="fullWidth">
            <TabItem title="فعالیت ها" icon={FaFileContract}>
              <h4>لیست فعالیت ها</h4>
            </TabItem>
          </Tabs>
        </>
      )} */}
    </>
  );
}
