import { DataStatus } from "@/constants/data/DataStatus";
import { usePermission } from "@/hooks/usePermission";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "flowbite-react";
import { FaSkullCrossbones } from "react-icons/fa6";
import { toast } from "sonner";

export default function DeletePermissionsModal({
  setDeletePermissionsModal,
  deletePermissionsModal,
  permissionIds,
  onCloseDeletePermissionsModal,
}: {
  setDeletePermissionsModal: (value: boolean) => void;
  deletePermissionsModal: boolean;
  permissionIds: number[] | [];
  onCloseDeletePermissionsModal: () => void;
}) {
  const {
    actions: { deletePermission, fetchPermissions },
    meta,
    loading,
  } = usePermission();
  const deletePermissionsAction = async (permissionIds: number[] | null) => {
    if (permissionIds && permissionIds.length > 0) {
      try {
        await deletePermission(permissionIds);
        await fetchPermissions(meta?.current_page, meta?.per_page);
        setDeletePermissionsModal(false);
        toast.success("مجوز با موفقیت حذف شد!");
      } catch (error) {
        console.error("Error deleting permission:", error);
        toast.error(" خطا در حذف مجوز ها.");
      } finally {
        await fetchPermissions(meta?.current_page, meta?.per_page);
        setDeletePermissionsModal(false);
      }
    }
  };
  return (
    <>
      <Modal
        show={deletePermissionsModal}
        size="md"
        onClose={onCloseDeletePermissionsModal}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center ">
            <FaSkullCrossbones className="mx-auto mb-4 h-14 w-14  text-status-danger-text" />
            <h3 className="mb-5 text-lg font-normal">
              آیا از حذف {permissionIds.length > 1 ? "مجوز های انتخاب شده" : "مجوز"} اطمینان دارید؟
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="danger"
                onClick={() => deletePermissionsAction(permissionIds)}
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
              <Button color="info" onClick={onCloseDeletePermissionsModal}>
                {"خیر، منصرف شدم"}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
