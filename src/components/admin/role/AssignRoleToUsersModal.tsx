import { Role } from "@/types/Role";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import AssignRoleToUsersForm from "./AssignRoleToUsersForm";

export default function AssignRoleToUsersModal({
  assignRoleToUsersModal,
  onCloseAssignRoleToUsersModal,
  role,
  ShowRoleDetails,
}: {
  assignRoleToUsersModal: boolean;
  onCloseAssignRoleToUsersModal: (role: Role) => void;
  role: Role;
  ShowRoleDetails: (role: Role) => void;
}) {
  return (
    <>
      <Modal
        show={assignRoleToUsersModal}
        onClose={() => onCloseAssignRoleToUsersModal(role)}
        size="md"
        popup
      >
        <ModalHeader />
        <ModalBody>
          <AssignRoleToUsersForm
            onCloseAssignRoleToUsersModal={onCloseAssignRoleToUsersModal}
            role={role}
            ShowRoleDetails={ShowRoleDetails}
          />
        </ModalBody>
      </Modal>
    </>
  );
}
