import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import EditRoleForm from "./EditRoleForm";
import { Role } from "@/types/Role";

export default function EditRoleModal({
  editRoleModal,
  onCloseEditRoleModal,
  setEditRoleModal,
  role
}: {
  editRoleModal: boolean;
  onCloseEditRoleModal: () => void;
  setEditRoleModal: (value: boolean) => void;
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
          <EditRoleForm setEditRoleModal={setEditRoleModal} role={role}/>
        </ModalBody>
      </Modal>
    </>
  );
}
