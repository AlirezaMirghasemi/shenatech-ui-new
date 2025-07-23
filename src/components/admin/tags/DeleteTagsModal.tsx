import { useTag } from "@/hooks/useTag";
import { ApiError } from "@/types/Api";
import { AxiosError } from "axios";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "flowbite-react";
import { FaSkullCrossbones } from "react-icons/fa6";
import { toast } from "sonner";

export default function DeleteTagsModal({
  deleteTagsModal,
  selectedIds,
  onCloseDeleteTagsModal,
}: {
  deleteTagsModal: boolean;
  selectedIds: Set<number>;
  onCloseDeleteTagsModal: () => void;
}) {
  const {
    actions: { deleteTags },
    statuses: { isDeleting },
  } = useTag();
  const deleteTagsAction = async (selectedIds: Set<number>) => {
    if (selectedIds && selectedIds.size > 0) {
      try {
        await deleteTags({ ids: Array.from(selectedIds) });
        onCloseDeleteTagsModal();
        toast.success("هشتگ با موفقیت حذف شد!");
      } catch (err: unknown) {
        const axiosError = err as AxiosError<ApiError>;
        toast.error(axiosError.message);
      } finally {
        onCloseDeleteTagsModal();
      }
    }
  };
  return (
    <>
      <Modal
        show={deleteTagsModal}
        size="md"
        onClose={onCloseDeleteTagsModal}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center ">
            <FaSkullCrossbones className="mx-auto mb-4 h-14 w-14  text-status-danger-text" />
            <h3 className="mb-5 text-lg font-normal">
              آیا از حذف {selectedIds.size > 1 ? "هشتگ های انتخاب شده" : "هشتگ"}{" "}
              اطمینان دارید؟
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="danger"
                onClick={() => deleteTagsAction(selectedIds)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Spinner aria-label="loading delete tags" size="sm" />
                  </>
                ) : (
                  "بله مطمئن هستم"
                )}
              </Button>
              <Button color="info" onClick={onCloseDeleteTagsModal}>
                {"خیر، منصرف شدم"}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
