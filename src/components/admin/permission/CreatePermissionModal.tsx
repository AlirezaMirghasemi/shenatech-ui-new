import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import CreatePermissionForm from "./CreatePermissionForm";

export default function CreatePermissionModal({
  createPermissionModal,
  onCloseCreatePermissionModal,
}: {
  createPermissionModal: boolean;
  onCloseCreatePermissionModal: () => void;
}) {
  return (
    <>
      <Modal
        show={createPermissionModal}
        onClose={onCloseCreatePermissionModal}
        size="md"
        popup
      >
        <ModalHeader />
        <ModalBody>
          <CreatePermissionForm
            onCloseCreatePermissionModal={onCloseCreatePermissionModal}
          />
        </ModalBody>
      </Modal>
    </>
  );
}
