import { DataStatus } from "@/constants/data/DataStatus";
import { useRole } from "@/hooks/useRole";
import { ApiError } from "@/types/Api";
import { AxiosError } from "axios";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "flowbite-react";
import { FaSkullCrossbones } from "react-icons/fa6";
import { toast } from "sonner";

export default function DeleteRoleModal({
  setDeleteRoleModal,
  deleteRoleModal,
  roleId,
  onCloseDeleteRoleModal,
}: {
  setDeleteRoleModal: (value: boolean) => void;
  deleteRoleModal: boolean;
  roleId: number | null;
  onCloseDeleteRoleModal: () => void;
}) {
  const {
    actions: { deleteRole, fetchRoles },
    meta,
    loading,
  } = useRole();
  const deleteRoleAction = async (roleId: number | null) => {
    if (roleId) {
      try {
        await deleteRole(roleId);
        await fetchRoles(meta?.current_page, meta?.per_page);
        setDeleteRoleModal(false);
        toast.success("نقش با موفقیت حذف شد!");
      } catch (err: unknown) {
        const axiosError = err as AxiosError<ApiError>;
        toast.error(axiosError.message);
      }
    }
  };
  return (
    <>
      <Modal
        show={deleteRoleModal}
        size="md"
        onClose={onCloseDeleteRoleModal}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center ">
            <FaSkullCrossbones className="mx-auto mb-4 h-14 w-14  text-status-danger-text" />
            <h3 className="mb-5 text-lg font-normal">
              آیا از حذف نقش اطمینان دارید؟
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="danger"
                onClick={() => deleteRoleAction(roleId)}
                disabled={loading === DataStatus.PENDING}
              >
                {loading === DataStatus.PENDING ? (
                  <>
                    <Spinner
                      aria-label="loading delete role permissions"
                      size="sm"
                    />
                  </>
                ) : (
                  "بله مطمئن هستم"
                )}
              </Button>
              <Button color="info" onClick={onCloseDeleteRoleModal}>
                {"خیر، منصرف شدم"}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
