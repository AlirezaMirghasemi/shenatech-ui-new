import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import CreateUserForm from "./CreateUserForm";

export default function CreateUserModal({
  createUserModal,
  onCloseCreateUserModal,
}: {
  createUserModal: boolean;
  onCloseCreateUserModal: () => void;
}) {
  return (
    <>
      <Modal
        show={createUserModal}
        onClose={onCloseCreateUserModal}
        size="xl"
        popup
      >
        <ModalHeader />
        <ModalBody>
          <CreateUserForm onCloseCreateUserModal={onCloseCreateUserModal} />
        </ModalBody>
      </Modal>
    </>
  );
}
