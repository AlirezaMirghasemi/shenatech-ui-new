import { DataStatus } from "@/constants/data/DataStatus";
import { usePermission } from "@/hooks/usePermission";
import { useRole } from "@/hooks/useRole";
import { ApiError } from "@/types/Api";
import { AxiosError } from "axios";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "flowbite-react";
import { FaSkullCrossbones } from "react-icons/fa6";
import { toast } from "sonner";

export default function DeletePermissionRolesModal({
  selectedIds,
  deletePermissionRolesModal,
  permissionId,
  onCloseDeletePermissionRolesModal,
}: {
  selectedIds: Set<number>;
  deletePermissionRolesModal: boolean;
  permissionId: number;
  onCloseDeletePermissionRolesModal: () => void;
}) {
  const {
    meta,
    actions: { fetchPermissionRoles },
  } = useRole();
  const {
    loading,
    meta: PermissionMeta,
    actions: { deletePermissionRoles, fetchPermissions },
  } = usePermission();
  const deletePermissionRolesAction = async (
    selectedIds: Set<number>,
    permissionId: number | null
  ) => {
    if (permissionId) {
      try {
        await deletePermissionRoles(permissionId, selectedIds);
        await fetchPermissions(
          PermissionMeta?.current_page,
          PermissionMeta?.per_page
        );
        await fetchPermissionRoles(
          permissionId,
          meta?.per_page,
          meta?.current_page
        );
        onCloseDeletePermissionRolesModal();
        toast.success("نقش ها با موفقیت حذف شدند");
      } catch (err: unknown) {
        const axiosError = err as AxiosError<ApiError>;
        toast.error(axiosError.message);
      } finally {
        onCloseDeletePermissionRolesModal();
      }
    }
  };
  return (
    <>
      <Modal
        show={deletePermissionRolesModal}
        size="md"
        onClose={onCloseDeletePermissionRolesModal}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center ">
            <FaSkullCrossbones className="mx-auto mb-4 h-14 w-14  text-status-danger-text" />
            <h3 className="mb-5 text-lg font-normal">
              آیا از حذف نقش های انتخاب شده از مجوز اطمینان دارید؟
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="danger"
                onClick={() =>
                  deletePermissionRolesAction(selectedIds, permissionId)
                }
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
              <Button color="info" onClick={onCloseDeletePermissionRolesModal}>
                {"خیر، منصرف شدم"}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
