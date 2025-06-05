import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import EditUserForm from "./EditUserForm";
import {  User } from "@/types/User";

export default function EditUserModal({
  editUserModal,
  onCloseEditUserModal,
  user,
}: {
  editUserModal: boolean;
  onCloseEditUserModal: () => void;
  user: User;
}) {
  return (
    <>
      <Modal
        show={editUserModal}
        onClose={onCloseEditUserModal}
        size="xl"
        popup
      >
        <ModalHeader />
        <ModalBody>
          <EditUserForm onCloseEditUserModal={onCloseEditUserModal} user={user}  />
        </ModalBody>
      </Modal>
    </>
  );
}
