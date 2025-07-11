"use client";
import LoadingField from "@/components/common/LoadingField";
import { DataStatus } from "@/constants/data/DataStatus";
import { useUser } from "@/hooks/useUser";
import { ApiError } from "@/types/Api";
import { User } from "@/types/User";
import { AxiosError } from "axios";
import { Button, HRText, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { toast } from "sonner";
import UserProfileBody from "./UserProfileBody";
import { useRef, useState } from "react";
import DynamicToggleSwitch from "../dynamics/DynamicFormInputs/DynamicToggleSwitch";

export default function DeleteUserModal({
  deleteUserModal,
  user,
  onCloseDeleteUserModal,
}: {
  deleteUserModal: boolean;
  user: User;
  onCloseDeleteUserModal: () => void;
}) {
  const {
    actions: { deleteUser, fetchUsers },
    meta,
    loading,
  } = useUser();
  const removeProfilePicture = useRef(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const deleteUserAction = async (
    userId: number,
    removeProfilePicture: boolean
  ) => {
    if (userId) {
      try {
        setDeleteLoading(true);
        await deleteUser(userId, removeProfilePicture);
        await fetchUsers(meta?.current_page, meta?.per_page);
        onCloseDeleteUserModal();
        toast.success("کاربر با موفقیت حذف شد!");
      } catch (err: unknown) {
        const axiosError = err as AxiosError<ApiError>;
        toast.error(axiosError.message);
        onCloseDeleteUserModal();
      }
    }
  };
  return (
    <>
      <Modal
        show={deleteUserModal}
        size="3xl"
        onClose={onCloseDeleteUserModal}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center border-accent border-1 border-dashed p-5 ">
            <h3 className="mb-5 text-2xl font-bold">
              آیا از حذف کاربر اطمینان دارید؟
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="danger"
                onClick={() => {
                  if (removeProfilePicture.current) {
                    deleteUserAction(
                      user.id,
                      (removeProfilePicture.current as HTMLInputElement).checked
                    );
                  }
                }}
                disabled={loading === DataStatus.PENDING}
              >
                {loading === DataStatus.PENDING && deleteLoading ? (
                  <>
                    <LoadingField placeholder="در حال حذف..." />
                  </>
                ) : loading === DataStatus.PENDING && !deleteLoading ? (
                  <LoadingField placeholder="لطفا کمی صبر کنید..." />
                ) : (
                  "بله مطمئن هستم"
                )}
              </Button>
              <Button color="info" onClick={onCloseDeleteUserModal}>
                {"خیر، منصرف شدم"}
              </Button>
            </div>
            <div className="relative">
              <HRText text="گزینه های پیشرفته" />
            </div>

            <div className="flex ">
              <DynamicToggleSwitch
                id="removeProfilePicture"
                name="removeProfilePicture"
                label="حذف عکس پروفایل"
                size="sm"
                color="info"
                ref={removeProfilePicture}
              />
            </div>
          </div>
          <UserProfileBody user={user} />
        </ModalBody>
      </Modal>
    </>
  );
}
