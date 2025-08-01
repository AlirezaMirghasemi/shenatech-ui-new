import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { User } from "@/types/User";
import AssignRolesToUserForm from "./AssignRolesToUserForm";

export default function AssignRolesToUserModal({
  assignRolesToUserModal,
  onCloseAssignRolesToUserModal,
  user,
}: {
  assignRolesToUserModal: boolean;
  onCloseAssignRolesToUserModal: () => void;
  user: User;
}) {
  return (
    <>
      <Modal
        show={assignRolesToUserModal}
        onClose={onCloseAssignRolesToUserModal}
        size="md"
        popup
      >
        <ModalHeader />
        <ModalBody>
          <AssignRolesToUserForm
            onCloseAssignRolesToUserModal={onCloseAssignRolesToUserModal}
            user={user}
          />
        </ModalBody>
      </Modal>
    </>
  );
}
