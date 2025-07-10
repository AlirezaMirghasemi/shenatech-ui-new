import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import CreateTagForm from "./CreateTagForm";

export default function CreateTagModal({
  createTagModal,
  onCloseCreateTagModal,
}: {
  createTagModal: boolean;
  onCloseCreateTagModal: () => void;
}) {
  return (
    <>
      <Modal
        show={createTagModal}
        onClose={onCloseCreateTagModal}
        size="xl"
        popup
      >
        <ModalHeader />
        <ModalBody>
          <CreateTagForm onCloseCreateTagModal={onCloseCreateTagModal} />
        </ModalBody>
      </Modal>
    </>
  );
}
