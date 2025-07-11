import { DataStatus } from "@/constants/data/DataStatus";
import { usePermission } from "@/hooks/usePermission";
import { useRole } from "@/hooks/useRole";
import { ApiError } from "@/types/Api";
import { AxiosError } from "axios";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "flowbite-react";
import { FaSkullCrossbones } from "react-icons/fa6";
import { toast } from "sonner";

export default function DeleteRolePermissionsModal({
  selectedIds,
  deleteRolePermissionsModal,
  roleId,
  onCloseDeleteRolePermissionsModal,

}: {
  selectedIds: Set<number>;
  deleteRolePermissionsModal: boolean;
  roleId: number;
  onCloseDeleteRolePermissionsModal: () => void;
}) {
  const {
    meta,
    loading,
    actions: { deleteRolePermissions, fetchRoles },
  } = useRole();
  const {
    meta: PermissionMeta,
    actions: { fetchRolePermissions },
  } = usePermission();
  const deleteRolePermissionsAction = async (
    selectedIds: Set<number>,
    roleId: number | null
  ) => {
    if (roleId) {
      try {
        await deleteRolePermissions(roleId, selectedIds);
        onCloseDeleteRolePermissionsModal();
        await fetchRoles(meta?.current_page, meta?.per_page);
        await fetchRolePermissions(
          roleId,
          PermissionMeta?.per_page,
          PermissionMeta?.current_page
        );
        toast.success("مجوز ها با موفقیت حذف شدند");
      } catch (err: unknown) {
        const axiosError = err as AxiosError<ApiError>;
        toast.error(axiosError.message);
      }
    }
  };

  return (
    <>
      <Modal
        show={deleteRolePermissionsModal}
        size="md"
        onClose={onCloseDeleteRolePermissionsModal}
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
                onClick={() => deleteRolePermissionsAction(selectedIds, roleId)}
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
              <Button color="info" onClick={onCloseDeleteRolePermissionsModal}>
                {"خیر، منصرف شدم"}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
