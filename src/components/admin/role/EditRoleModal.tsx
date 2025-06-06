import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import EditRoleForm from "./EditRoleForm";
import { Role } from "@/types/Role";

export default function EditRoleModal({
  editRoleModal,
  onCloseEditRoleModal,
  role
}: {
  editRoleModal: boolean;
  onCloseEditRoleModal: () => void;
  role:Role
}) {
  return (
    <>
      <Modal
        show={editRoleModal}
        onClose={onCloseEditRoleModal}
        size="md"
        popup
      >
        <ModalHeader />
        <ModalBody>
          <EditRoleForm onCloseEditRoleModal={onCloseEditRoleModal} role={role}/>
        </ModalBody>
      </Modal>
    </>
  );
}
