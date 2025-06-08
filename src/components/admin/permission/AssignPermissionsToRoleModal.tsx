import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import AssignPermissionsToRoleForm from "./AssignPermissionsToRoleForm";
import { Permission } from "@/types/Permission";

export default function AssignPermissionsToRoleModal({
  assignPermissionsToRoleModal,
  onCloseAssignPermissionsToRoleModal,
  permissions,
  selectedIds,
}: {
  assignPermissionsToRoleModal: boolean;
  onCloseAssignPermissionsToRoleModal: () => void;
  permissions: Permission[];
  selectedIds: number[];
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
            onCloseAssignPermissionsToRoleModal={onCloseAssignPermissionsToRoleModal}
            permissions={permissions}
            selectedIds={Array.from(selectedIds)}
          />
        </ModalBody>
      </Modal>
    </>
  );
}
