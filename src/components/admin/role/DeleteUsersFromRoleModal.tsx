import { DataStatus } from "@/constants/data/DataStatus";
import { useRole } from "@/hooks/useRole";
import { useUser } from "@/hooks/useUser";
import { ApiError } from "@/types/Api";
import { AxiosError } from "axios";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "flowbite-react";
import { FaSkullCrossbones } from "react-icons/fa6";
import { toast } from "sonner";

export default function DeleteUsersFromRoleModal({
  deleteUsersFromRoleModal,
  onCloseDeleteUsersFromRoleModal,
  selectedIds,
  roleId,

}: {
  deleteUsersFromRoleModal: boolean;
  onCloseDeleteUsersFromRoleModal: () => void;
  selectedIds: Set<number>;
  roleId: number;
}) {
  const {
    loading,
    meta,
    actions: { deleteUsersFromRole, fetchRoles },
  } = useRole();
  const {
    actions: { fetchRoleUsers },
    meta: RoleUsersMeta,
  } = useUser();
  const deleteUsersFromRoleAction = async (
    userIds: Set<number>,
    roleId: number
  ) => {
    try {
      await deleteUsersFromRole(roleId, userIds);
      await fetchRoles(meta?.current_page, meta?.per_page);
      await onCloseDeleteUsersFromRoleModal();
      await fetchRoleUsers(
        roleId,
        RoleUsersMeta?.per_page,
        RoleUsersMeta?.current_page
      );
      toast.success("حذف کاربران از نقش با موفقیت انجام شد.");
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      toast.error(axiosError.message);
    }
  };
  return (
    <>
      <Modal
        show={deleteUsersFromRoleModal}
        size="md"
        onClose={onCloseDeleteUsersFromRoleModal}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center ">
            <FaSkullCrossbones className="mx-auto mb-4 h-14 w-14  text-status-danger-text" />
            <h3 className="mb-5 text-lg font-normal">
              آیا از حذف مجوز های انتخاب شده از نقش اطمینان دارید؟
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="danger"
                onClick={() => deleteUsersFromRoleAction(selectedIds, roleId)}
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
              <Button color="info" onClick={onCloseDeleteUsersFromRoleModal}>
                {"خیر، منصرف شدم"}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
