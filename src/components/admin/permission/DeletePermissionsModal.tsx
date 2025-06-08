import { DataStatus } from "@/constants/data/DataStatus";
import { usePermission } from "@/hooks/usePermission";
import { ApiError } from "@/types/Api";
import { AxiosError } from "axios";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "flowbite-react";
import { FaSkullCrossbones } from "react-icons/fa6";
import { toast } from "sonner";

export default function DeletePermissionsModal({
  deletePermissionsModal,
  selectedIds,
  onCloseDeletePermissionsModal,
}: {
  deletePermissionsModal: boolean;
  selectedIds: Set<number>;
  onCloseDeletePermissionsModal: () => void;
}) {
  const {
    actions: { deletePermission, fetchPermissions },
    meta,
    loading,
  } = usePermission();
  const deletePermissionsAction = async (selectedIds: Set<number>) => {
    if (selectedIds && selectedIds.size > 0) {
      try {
        await deletePermission(Array.from(selectedIds));
        onCloseDeletePermissionsModal();
        toast.success("مجوز با موفقیت حذف شد!");
        return await fetchPermissions(meta?.current_page, meta?.per_page);
      } catch (err: unknown) {
        const axiosError = err as AxiosError<ApiError>;
        toast.error(axiosError.message);
      } finally {
        onCloseDeletePermissionsModal();
        return await fetchPermissions(meta?.current_page, meta?.per_page);
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
              آیا از حذف {selectedIds.size > 1 ? "مجوز های انتخاب شده" : "مجوز"}{" "}
              اطمینان دارید؟
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="danger"
                onClick={() => deletePermissionsAction(selectedIds)}
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
