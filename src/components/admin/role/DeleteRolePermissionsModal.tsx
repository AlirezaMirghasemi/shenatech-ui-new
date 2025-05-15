import { DataStatus } from "@/constants/data/DataStatus";
import { usePermission } from "@/hooks/usePermission";
import { useRole } from "@/hooks/useRole";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "flowbite-react";
import { FaSkullCrossbones } from "react-icons/fa6";
import { toast } from "sonner";

export default function DeleteRolePermissionsModal({
  selectedIds,
  setSelectedIds,
  setDeleteRolePermissionsModal,
  deleteRolePermissionsModal,
  roleId,
  onCloseDeleteRolePermissionsModal,
}: {
  selectedIds: Set<number>;
  setSelectedIds: (ids: Set<number>) => void;
  setDeleteRolePermissionsModal: (open: boolean) => void;
  deleteRolePermissionsModal: boolean;
  roleId: number;
  onCloseDeleteRolePermissionsModal: () => void;
}) {
  const {
    error,
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
        setSelectedIds(new Set());
        setDeleteRolePermissionsModal(false);
        toast.success("مجوز ها با موفقیت حذف شدند", { duration: 3000 });
        await fetchRoles(meta?.current_page, meta?.per_page);
        await fetchRolePermissions(roleId, PermissionMeta?.per_page, PermissionMeta?.current_page);
      } catch {
        type ErrorWithMessage = { message: string };
        toast.error(
          error &&
            typeof error === "object" &&
            "message" in error &&
            typeof (error as ErrorWithMessage).message === "string"
            ? (error as ErrorWithMessage).message
            : "خطایی رخ داد"
        );
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
                    <span className="pl-3">در حال حذف مجوز ها</span>
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
