import { Color } from "@/constants/data/Color";
import { useTag } from "@/hooks/useTag";
import { Tag } from "@/types/Tag";
import {
  Alert,
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
} from "flowbite-react";
import { FaSkullCrossbones } from "react-icons/fa6";
import { toast } from "sonner";

export default function RestoreTagsModal({
  restoreTagsModal,
  selectedIds,
  onCloseRestoreTagsModal,
  selectedTags,
}: {
  restoreTagsModal: boolean;
  selectedIds: Set<number>;
  onCloseRestoreTagsModal: () => void;
  selectedTags: Tag[] | null;
}) {
  const {
    actions: { restoreTags },
    statuses: { isEditing },
  } = useTag();

  const restoreTagsAction = async () => {
    if (selectedIds.size === 0) {
      toast.warning("هیچ هشتگی برای بازیابی انتخاب نشده است!");
      return;
    }

    try {
      await restoreTags(Array.from(selectedIds));
      toast.success("هشتگ(ها) با موفقیت بازیابی شدند!");
      onCloseRestoreTagsModal();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "خطا در بازیابی هشتگ(ها)"
      );
      onCloseRestoreTagsModal();
    }
  };
  console.log(selectedTags);
  return (
    <Modal
      show={restoreTagsModal}
      size="md"
      onClose={onCloseRestoreTagsModal}
      popup
    >
      <ModalHeader />

      <ModalBody>

        <div className="text-center">
          <FaSkullCrossbones className="mx-auto mb-4 h-14 w-14 text-status-danger-text" />
          <h3 className="mb-5 text-lg font-normal">
            آیا از بازیابی{" "}
            {selectedIds.size != 1 ? "هشتگ های انتخاب شده" : "هشتگ"} اطمینان
            دارید؟
          </h3>
          <div className="flex flex-row w-full justify-center items-center ">

        </div>
        <div className="flex flex-row w-full my-5">
          <Alert color={Color.info} className="flex flex-row w-full items-center">
            {selectedTags &&
              selectedTags.map((tag) => (
                <Badge key={tag.id} size="sm" color="success" className="cursor-none">
                  {tag.title}
                </Badge>
              ))}
          </Alert>
        </div>
          <div className="flex justify-center gap-4">
            <Button
              color="danger"
              onClick={restoreTagsAction}
              disabled={isEditing}
            >
              {isEditing ? (
                <Spinner aria-label="در حال بازیابی" size="sm" />
              ) : (
                "بله، بازیابی شود"
              )}
            </Button>
            <Button color="info" onClick={onCloseRestoreTagsModal}>
              انصراف
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
