import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import CreateRoleForm from "./CreateRoleForm";

export default function CreateRoleModal({
  createRoleModal,
  onCloseCreateRoleModal,
}: {
  createRoleModal: boolean;
  onCloseCreateRoleModal: () => void;
}) {
  return (
    <>
      <Modal
        show={createRoleModal}
        onClose={onCloseCreateRoleModal}
        size="md"
        popup
      >
        <ModalHeader />
        <ModalBody>
          <CreateRoleForm onCloseCreateRoleModal={onCloseCreateRoleModal} />
        </ModalBody>
      </Modal>
    </>
  );
}
