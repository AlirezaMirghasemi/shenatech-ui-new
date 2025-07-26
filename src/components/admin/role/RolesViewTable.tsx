"use client";
import DynamicTable from "@/components/admin/dynamics/dynamicTable/DynamicTable";
import { useRole } from "@/hooks/useRole";
import { Role } from "@/types/Role";
import { useEffect, useRef, useState } from "react";

import CreateRoleModal from "./CreateRoleModal";
import AssignPermissionModal from "./AssignPermissionModal";
import EditRoleModal from "./EditRoleModal";
import DeleteRoleModal from "./DeleteRoleModal";
import AssignRoleToUsersModal from "./AssignRoleToUsersModal";
import useTable from "@/hooks/useTable";
import { ModalData, ModalType } from "@/constants/data/ModalType";
import RolesViewTableInitials from "./Initials/RolesViewTableInitials";
import { useTableState } from "@/hooks/useTableState";
export default function RolesViewTable() {
  const {
    actions: { fetchRoles },
    roles,
    meta,
    loading,
    error,
  } = useRole();
  const handleTable = useTable<Role>();
  const { modals, modalData, openModal, closeModal } = useTableState();
  const [currentPage, setCurrentPage] = useState("1");
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  //   const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  useEffect(() => {
    fetchRoles({ search: searchValue, page: currentPage, perPage: "10" });
  }, [currentPage, searchValue]);

  useEffect(() => {
    handleTable.handleSelect.clearSelection();
  }, [currentPage, searchValue]);

  const actionContext = {
    setSelectedIds: handleTable.handleSelect.setSelectedIds,
    setSelectedRows: handleTable.handleSelect.setSelectedRows,
    selectedIds: handleTable.handleSelect.selectedIds,
    selectedRows: handleTable.handleSelect.selectedRows,
    data: handleTable.handleSelect.data,
    setData: handleTable.handleSelect.setData,
    openModal: (modal: ModalType, data: ModalData<Role>) => {
      openModal(modal, data);
    },
  };

  return (
    <>
      <DynamicTable
        dynamicTable={RolesViewTableInitials({
          searchValue,
          setSearchValue,
          searchRef,
          roles,
          meta,
          loading,
          error,
          actionContext,
        })}
        setPage={setCurrentPage}
        handleTable={handleTable}
        actionContext={actionContext}
      />

      {/* {role && (
        <>
          <AssignPermissionModal
            assignPermissionModal={assignPermissionModal}
            onCloseAssignPermissionModal={onCloseAssignPermissionModal}
            role={role}
            ShowRoleDetails={ShowRoleDetails}
          />
          <EditRoleModal
            editRoleModal={editRoleModal}
            onCloseEditRoleModal={onCloseEditRoleModal}
            role={role}
          />
          <DeleteRoleModal
            deleteRoleModal={deleteRoleModal}
            role={role}
            onCloseDeleteRoleModal={onCloseDeleteRoleModal}
          />
          <AssignRoleToUsersModal
            assignRoleToUsersModal={assignRoleToUsersModal}
            onCloseAssignRoleToUsersModal={onCloseAssignRoleToUsersModal}
            role={role}
            ShowRoleDetails={ShowRoleDetails}
          />
        </>
      )}*/}
      <CreateRoleModal
        createRoleModal={modals.create}
        onCloseCreateRoleModal={() => closeModal("create")}
      />
      {handleTable.handleSelect.selectedRows.length != 0 && (
        <DeleteRoleModal
          deleteRoleModal={modals.delete}
          onCloseDeleteRoleModal={() => {
            closeModal("delete");
            handleTable.handleSelect.clearSelection();
          }}
          role={handleTable.handleSelect.selectedRows[0]}
        />
      )}
    </>
  );
}
