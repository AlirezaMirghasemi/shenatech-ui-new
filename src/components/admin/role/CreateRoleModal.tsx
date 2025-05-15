import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import CreateRoleForm from "./CreateRoleForm";

export default function CreateRoleModal({createRoleModal,onCloseCreateRoleModal,setCreateRoleModal}:{createRoleModal:boolean;onCloseCreateRoleModal:()=>void;setCreateRoleModal:(value:boolean)=>void}) {
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
          <CreateRoleForm setCreateRoleModal={setCreateRoleModal} />
        </ModalBody>
      </Modal>
    </>
  );
}
