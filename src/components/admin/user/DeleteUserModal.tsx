"use client";

import { User } from "@/types/User";
import { HRText, Modal, ModalBody, ModalHeader } from "flowbite-react";
import UserProfileBody from "./UserProfileBody";
import DeleteUserForm from "./DeleteUserForm";

export default function DeleteUserModal({
  deleteUserModal,
  user,
  onCloseDeleteUserModal,
}: {
  deleteUserModal: boolean;
  user: User;
  onCloseDeleteUserModal: () => void;
}) {
  return (
    <>
      <Modal
        show={deleteUserModal}
        size="3xl"
        onClose={onCloseDeleteUserModal}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <UserProfileBody user={user} />
          <div className="text-center border-accent border-1 border-dashed p-5 ">
            <h3 className="mb-5 text-2xl font-bold">
              آیا از حذف کاربر اطمینان دارید؟
            </h3>
            <div className="relative">
              <HRText text="گزینه های پیشرفته" />
            </div>
            <DeleteUserForm
              userId={user.id}
              onCloseDeleteUserModal={onCloseDeleteUserModal}
            />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
