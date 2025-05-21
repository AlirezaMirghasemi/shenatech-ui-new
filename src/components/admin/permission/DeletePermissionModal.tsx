import { DataStatus } from "@/constants/data/DataStatus";
import { usePermission } from "@/hooks/usePermission";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "flowbite-react";
import { FaSkullCrossbones } from "react-icons/fa6";
import { toast } from "sonner";

export default function DeletePermissionModal({
  setDeletePermissionModal,
  deletePermissionModal,
  permissionId,
  onCloseDeletePermissionModal,
}: {
  setDeletePermissionModal: (value: boolean) => void;
  deletePermissionModal: boolean;
  permissionId: number | null;
  onCloseDeletePermissionModal: () => void;
}) {
  const {
    actions: { deletePermission, fetchPermissions },
    meta,
    loading,
  } = usePermission();
  const deletePermissionAction = async (permissionId: number | null) => {
    if (permissionId) {
      try {
        await deletePermission(permissionId);
        await fetchPermissions(meta?.current_page, meta?.per_page);
        setDeletePermissionModal(false);
        toast.success("مجوز با موفقیت حذف شد!");
      } catch (error) {
        console.error("Error deleting permission:", error);
        toast.error("خطا در حذف مجوز.");
      } finally {
        await fetchPermissions(meta?.current_page, meta?.per_page);
        setDeletePermissionModal(false);
      }
    }
  };
  return (
    <>
      <Modal
        show={deletePermissionModal}
        size="md"
        onClose={onCloseDeletePermissionModal}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center ">
            <FaSkullCrossbones className="mx-auto mb-4 h-14 w-14  text-status-danger-text" />
            <h3 className="mb-5 text-lg font-normal">
              آیا از حذف مجوز اطمینان دارید؟
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="danger"
                onClick={() => deletePermissionAction(permissionId)}
                disabled={loading === DataStatus.PENDING}
              >
                {loading === DataStatus.PENDING ? (
                  <>
                    <Spinner aria-label="loading delete permission" size="sm" />
                  </>
                ) : (
                  "بله مطمئن هستم"
                )}
              </Button>
              <Button color="info" onClick={onCloseDeletePermissionModal}>
                {"خیر، منصرف شدم"}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
