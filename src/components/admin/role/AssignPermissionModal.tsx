import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import AssignPermissionForm from "./AssignPermissionForm";
import { Role } from "@/types/Role";

export default function AssignPermissionModal({
  assignPermissionModal,
  onCloseAssignPermissionModal,
  role,
  setAssignPermissionModal,
  setRoleId,
}: {
  assignPermissionModal: boolean;
  onCloseAssignPermissionModal: () => void;
  role: Role;
  setAssignPermissionModal: (value: boolean) => void;
  setRoleId: (value: number | null) => void;
}) {
  return (
    <>
      <Modal
        show={assignPermissionModal}
        onClose={onCloseAssignPermissionModal}
        size="md"
        popup
      >
        <ModalHeader />
          <ModalBody>
            <AssignPermissionForm
              role={role}
              setAssignPermissionModal={setAssignPermissionModal}
              setRoleId={setRoleId}
            />
          </ModalBody>
      </Modal>
    </>
  );
}
