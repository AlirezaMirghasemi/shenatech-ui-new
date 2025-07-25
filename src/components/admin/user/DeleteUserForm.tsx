import { useUser } from "@/hooks/useUser";
import { DeleteUser } from "@/types/User";
import { FormikHelpers } from "formik";
import { toast } from "sonner";
import DynamicInputField from "../dynamics/dynamicFormInputs/DynamicInputField";
import { InputType } from "@/constants/data/InputType";
import DynamicForm from "../dynamics/DynamicForm";
import { deleteUserInitial } from "@/validations/admin/user/deleteUserInitial";
import { deleteUserSchema } from "@/validations/admin/user/deleteUserSchema";

export default function DeleteUserForm({
  userId,
  onCloseDeleteUserModal,
}: {
  userId: number;
  onCloseDeleteUserModal: () => void;
}) {
  {
    const {
      actions: { deleteUser },
      statuses: { isDeleting },
    } = useUser();
    const onSubmit = async (
      values: DeleteUser,
      { setSubmitting }: FormikHelpers<DeleteUser>
    ) => {
      try {
        await deleteUser(values);
        onCloseDeleteUserModal();
        toast.success("کاربر با موفقیت حدف شد.");
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("خطا در حدف کاربر.");
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <>
        <DynamicForm
          initialValues={deleteUserInitial({ userId })}
          validationSchema={deleteUserSchema}
          buttonTitle="حذف کاربر"
          onSubmit={onSubmit}
          buttonClassName=" w-max  "
          validateOnChange={true}
          validateOnBlur={true}
          disabledButton={isDeleting}
          cancelButton={true}
          cancelButtonOnClick={onCloseDeleteUserModal}
          cancelButtonColor="warning"
          cancelButtonTitle="خیر منصرف شدم"
          cancelButtonClassName=" w-max"
          disabledCancelButton={isDeleting}
        >
          <div className="mb-5 grid grid-cols-1 gap-4  sm:grid-cols-2 relative rounded-lg">
            <div className="flex col-span-2 items-center justify-center sm:col-span-1">
              <DynamicInputField
                id="removeProfilePicture"
                name="removeProfilePicture"
                label="حذف عکس پروفایل"
                size="sm"
                color="info"
                type={InputType.TOGGLE_SWITCH}
              />
            </div>
            <div className="flex col-span-2 items-center justify-center sm:col-span-1">
              <DynamicInputField
                id="removeRoles"
                name="removeRoles"
                label="حذف نقش ها از کاربر"
                size="sm"
                color="info"
                type={InputType.TOGGLE_SWITCH}
              />
            </div>
          </div>
        </DynamicForm>
      </>
    );
  }
}
