import { User } from "@/types/User";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import UserProfileBody from "./UserProfileBody";
export default function UserProfileModal({
  user,
  onClose,
  userProfileModal,
}: {
  user: User;
  onClose: () => void;
  userProfileModal: boolean;
}) {
  return (
    <>
      <Modal show={userProfileModal} onClose={onClose} size="3xl" popup>
        <ModalHeader />
        <ModalBody>
          <UserProfileBody user={user} />
        </ModalBody>
      </Modal>
    </>
  );
}
