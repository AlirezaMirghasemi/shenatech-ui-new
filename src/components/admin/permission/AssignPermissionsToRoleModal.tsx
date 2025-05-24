import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import AssignPermissionsToRoleForm from "./AssignPermissionsToRoleForm";
import { Permission } from "@/types/Permission";

export default function AssignPermissionsToRoleModal({
  assignPermissionsToRoleModal,
  onCloseAssignPermissionsToRoleModal,
  setAssignPermissionsToRoleModal,
  permissions,
  selectedIds,
  setSelectedIds,
  setPermissionId
}: {
  assignPermissionsToRoleModal: boolean;
  onCloseAssignPermissionsToRoleModal: () => void;
  setAssignPermissionsToRoleModal: (value: boolean) => void;
  permissions: Permission[];
  selectedIds: number[];
  setSelectedIds: (value: Set<number>) => void;
  setPermissionId: (id: number | null) => void;
}) {
  return (
    <>
      <Modal
        show={assignPermissionsToRoleModal}
        onClose={onCloseAssignPermissionsToRoleModal}
        size="md"
        popup
      >
        <ModalHeader />
        <ModalBody>
          <AssignPermissionsToRoleForm
            setAssignPermissionsToRoleModal={setAssignPermissionsToRoleModal}
            permissions={permissions}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            setPermissionId={ setPermissionId }
          />
        </ModalBody>
      </Modal>
    </>
  );
}
