"use client";
import DynamicTable from "@/components/admin/dynamics/dynamicTable/DynamicTable";

import { useEffect, useMemo, useRef, useState } from "react";
import { User } from "@/types/User";

import useTable from "@/hooks/useTable";
//import { ModalData, ModalType, ModalTypeValue } from "@/constants/data/Modal";
import { Role } from "@/types/Role";
import UserRolesTableInitials from "./Initials/UserRolesTableInitials";
import { PaginatedResponse } from "@/types/Api";
import { useUserRoles } from "@/hooks/useUserRoles";
import { ModalData, ModalType, ModalTypeValue } from "@/constants/data/Modal";
import { useTableState } from "@/hooks/useTableState";
import AssignRolesToUserModal from "./AssignRolesToUserModal";
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
  const actionContext = useMemo(
    () => ({
      setSelectedIds: handleTable.handleSelect.setSelectedIds,
      setSelectedRows: handleTable.handleSelect.setSelectedRows,
      selectedIds: handleTable.handleSelect.selectedIds,
      selectedRows: handleTable.handleSelect.selectedRows,
      data: handleTable.handleSelect.data,
      setData: handleTable.handleSelect.setData,
      parentId: user.id,
      setParentId: handleTable.handleSelect.setParentId,
      openModal: (modal: ModalTypeValue, data: ModalData<Role>) => {
        openModal(modal, data);
      },
    }),
    [handleTable, user.id, openModal]
  );
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
        actionContext={actionContext}
      />

      <AssignRolesToUserModal
        assignRolesToUserModal={modals.userRoleModal.assignRoles}
        onCloseAssignRolesToUserModal={() => {
          closeModal(ModalType.userRoleModalType.assignRoles);
        }}
        user={user}
      />
    </>
  );
}
