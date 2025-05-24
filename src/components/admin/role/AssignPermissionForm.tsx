import DynamicForm from "@/components/admin/dynamics/DynamicForm";
import DynamicInputField from "@/components/admin/dynamics/DynamicInputField";
import { DataStatus } from "@/constants/data/DataStatus";
import { InputType } from "@/constants/data/InputType";
import { usePermission } from "@/hooks/usePermission";
import { useRole } from "@/hooks/useRole";
import { AssignPermission, Role } from "@/types/Role";
import { assignPermissionInitial } from "@/validations/admin/role/assignPermissionInitial";
import { assignPermissionSchema } from "@/validations/admin/role/assignPermissionSchema";
import { AxiosError } from "axios";
import { FormikHelpers } from "formik";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AssignPermissionForm({
  role,
  setAssignPermissionModal,
  setRoleId,
}: {
  role: Role;
  setAssignPermissionModal: (isOpen: boolean) => void;
  setRoleId: (roleId: number | null) => void;
}) {
  const router = useRouter();
  const {
    actions: { fetchRoleNotPermissions },
    loading,
    unassigned,
  } = usePermission();
  const {
    meta,
    actions: { assignRolePermissions, fetchRoles },
  } = useRole();
  useEffect(() => {
    fetchRoleNotPermissions(role.id);
  }, [role.id, setRoleId]);
  const onSubmit = async (
    values: AssignPermission,
    { setSubmitting }: FormikHelpers<AssignPermission>
  ) => {
    try {
      await assignRolePermissions(role.id, values.permissionIds);
      await toast.success("مجوزها با موفقیت تخصیص داده شدند.");
      await setAssignPermissionModal(false);
      await setRoleId(null);
      await router.push("/admin/dashboard/roles");
      await fetchRoles(meta?.current_page, meta?.per_page);
      await setRoleId(role.id);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>;
      console.error("assign-permissions error:", axiosError.response?.data);
      toast.error(axiosError.response?.data?.message || "خطای نامشخص");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <DynamicForm
        initialValues={assignPermissionInitial}
        validationSchema={assignPermissionSchema}
        onSubmit={onSubmit}
        buttonTitle="تخصیص مجوز"
        disabledButton={loading === DataStatus.PENDING}
      >
        <p className="text-xs font-bold text-neutral-100 mt-3 mb-1">نام نقش</p>
        <p className="text-lg text-neutral-100 mb-1">{role.name}</p>
        <DynamicInputField
          id="permissionIds"
          name="permissionIds"
          type={InputType.SELECT}
          placeholder="مجوز ها"
          label="مجوز ها"
          disabled={loading === DataStatus.PENDING}
          className="rounded-lg block w-full p-0.2 mb-2"
          multiple={true}
          data={
             unassigned
          }
        />
      </DynamicForm>
    </>
  );
}
