import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import AssignPermissionForm from "./AssignPermissionForm";
import { Role } from "@/types/Role";

export default function AssignPermissionModal({
  assignPermissionModal,
  onCloseAssignPermissionModal,
  role,
}: {
  assignPermissionModal: boolean;
  onCloseAssignPermissionModal: () => void;
  role: Role;
}) {
  return (
    <>
      <Modal
        show={assignPermissionModal}
        onClose={onCloseAssignPermissionModal}
        size="md"
        popup
      >
        <ModalHeader />
          <ModalBody>
            <AssignPermissionForm
              role={role}
              onCloseAssignPermissionModal={onCloseAssignPermissionModal}
            />
          </ModalBody>
      </Modal>
    </>
  );
}
