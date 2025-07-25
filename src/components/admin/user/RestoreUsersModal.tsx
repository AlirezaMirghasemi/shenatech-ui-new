import { Color } from "@/constants/data/Color";
import { useUser } from "@/hooks/useUser";
import { User } from "@/types/User";
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

export default function RestoreUsersModal({
  restoreUsersModal,
  selectedIds,
  onCloseRestoreUsersModal,
  selectedUsers,
}: {
  restoreUsersModal: boolean;
  selectedIds: Set<number>;
  onCloseRestoreUsersModal: () => void;
  selectedUsers: User[] | null;
}) {
  const {
    actions: { restoreUsers },
    statuses: { isEditing },
  } = useUser();

  const restoreUsersAction = async () => {
    if (selectedIds.size === 0) {
      toast.warning("هیچ کاربری برای بازیابی انتخاب نشده است!");
      return;
    }

    try {
      await restoreUsers(Array.from(selectedIds));
      toast.success("کاربران با موفقیت بازیابی شدند!");
      onCloseRestoreUsersModal();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "خطا در بازیابی کاربران"
      );
      onCloseRestoreUsersModal();
    }
  };
  console.log(selectedUsers);
  return (
    <Modal
      show={restoreUsersModal}
      size="md"
      onClose={onCloseRestoreUsersModal}
      popup
    >
      <ModalHeader />

      <ModalBody>
        <div className="text-center">
          <FaSkullCrossbones className="mx-auto mb-4 h-14 w-14 text-status-danger-text" />
          <h3 className="mb-5 text-lg font-normal">
            آیا از بازیابی{" "}
            {selectedIds.size != 1 ? "کاربران انتخاب شده" : "کاربر"} اطمینان
            دارید؟
          </h3>
          <div className="flex flex-row w-full justify-center items-center "></div>
          <div className="flex flex-row w-full my-5">
            <Alert
              color={Color.info}
              className="flex flex-row w-full items-center"
            >
              {selectedUsers &&
                selectedUsers.map((user) => (
                  <Badge
                    key={user.id}
                    size="sm"
                    color="success"
                    className="cursor-none"
                  >
                    {user.username}
                  </Badge>
                ))}
            </Alert>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              color="danger"
              onClick={restoreUsersAction}
              disabled={isEditing}
            >
              {isEditing ? (
                <Spinner aria-label="در حال بازیابی" size="sm" />
              ) : (
                "بله، بازیابی شود"
              )}
            </Button>
            <Button color="info" onClick={onCloseRestoreUsersModal}>
              انصراف
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
