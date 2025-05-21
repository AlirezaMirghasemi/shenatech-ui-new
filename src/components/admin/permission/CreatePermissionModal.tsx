import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import CreatePermissionForm from "./CreatePermissionForm";

export default function CreatePermissionModal({createPermissionModal,onCloseCreatePermissionModal,setCreatePermissionModal}:{createPermissionModal:boolean;onCloseCreatePermissionModal:()=>void;setCreatePermissionModal:(value:boolean)=>void}) {
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
          <CreatePermissionForm setCreatePermissionModal={setCreatePermissionModal} />
        </ModalBody>
      </Modal>
    </>
  );
}
