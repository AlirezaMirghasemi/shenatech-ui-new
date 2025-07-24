import { useTag } from "@/hooks/useTag";
import { Tag } from "@/types/Tag";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "flowbite-react";
import { FaSkullCrossbones } from "react-icons/fa6";
import { toast } from "sonner";

export default function DeleteTagsModal({
  deleteTagsModal,
  selectedIds,
  onCloseDeleteTagsModal,
  selectedTags,
}: {
  deleteTagsModal: boolean;
  selectedIds: Set<number>;
  onCloseDeleteTagsModal: () => void;
  selectedTags: Tag[] | null;
}) {
  const {
    actions: { deleteTags },
    statuses: { isDeleting },
  } = useTag();

  const deleteTagsAction = async () => {
    if (selectedIds.size === 0) {
      toast.warning("هیچ هشتگی برای حذف انتخاب نشده است!");
      return;
    }

    try {
      await deleteTags({ ids: Array.from(selectedIds) });
      toast.success("هشتگ(ها) با موفقیت حذف شدند!");
      onCloseDeleteTagsModal();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "خطا در حذف هشتگ(ها)"
      );
    }
  };
console.log(selectedTags);
  return (
    <Modal
      show={deleteTagsModal}
      size="md"
      onClose={onCloseDeleteTagsModal}
      popup
    >
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <FaSkullCrossbones className="mx-auto mb-4 h-14 w-14 text-status-danger-text" />
          <h3 className="mb-5 text-lg font-normal">
            آیا از حذف {selectedIds.size > 1 ? "هشتگ های انتخاب شده" : "هشتگ"}{" "}
            اطمینان دارید؟
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="danger"
              onClick={deleteTagsAction}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Spinner aria-label="در حال حذف" size="sm" />
              ) : (
                "بله، حذف شود"
              )}
            </Button>
            <Button color="info" onClick={onCloseDeleteTagsModal}>
              انصراف
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
