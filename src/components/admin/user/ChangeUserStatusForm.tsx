import { editUserStatusInitial } from "@/validations/admin/user/editUserStatusInitial";
import DynamicForm from "../dynamics/DynamicForm";
import { editUserStatusSchema } from "@/validations/admin/user/editUserStatusSchema";
import { InputType } from "@/constants/data/InputType";
import DynamicInputField from "../dynamics/dynamicFormInputs/DynamicInputField";
import { UserStatus, UserStatusTitles } from "@/constants/data/UserStatus";
import { EditUserStatus, User } from "@/types/User";
import { FormikHelpers } from "formik";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";

export default function ChangeUserStatusForm({
  user,
  onClose,
}: {
  user: User;
  onClose: () => void;
}) {
  const {
    actions: { editUserStatus },
    loading,
  } = useUser();

  const onSubmit = async (
    values: EditUserStatus,
    { setSubmitting }: FormikHelpers<EditUserStatus>
  ) => {
    try {
      await editUserStatus(user.id, values.status);
      toast.success("وضعیت کاربر با موفقیت ویرایش شد.");
      onClose(); // Close after success
    } catch (error) {
      console.error("Error changing user status:", error);
      toast.error("خطا در ویرایش وضعیت کاربر.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full p-3  bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <DynamicForm
        initialValues={editUserStatusInitial({ status: user.status })}
        validationSchema={editUserStatusSchema()}
        buttonTitle="ویرایش "
        onSubmit={onSubmit}
        validateOnChange={true}
        validateOnBlur={true}
        disabledButton={loading}
        submitButtonSize="sm"
        buttonClassName="w-full"
        cancelButton
        cancelButtonOnClick={onClose}
        cancelButtonColor="danger"
        cancelButtonSize="sm"
        cancelButtonTitle="لغو"
        disabledCancelButton={loading}
      >
        <DynamicInputField
          label="تغییر وضعیت کاربر"
          id="status"
          name="status"
          type={InputType.SELECT}
          data={[
            {
              value: UserStatus.PENDING,
              label: UserStatusTitles.getUserStatusTitle(UserStatus.PENDING),
            },
            {
              value: UserStatus.ACTIVE,
              label: UserStatusTitles.getUserStatusTitle(UserStatus.ACTIVE),
            },
            {
              value: UserStatus.DEACTIVATED,
              label: UserStatusTitles.getUserStatusTitle(
                UserStatus.DEACTIVATED
              ),
            },
            {
              value: UserStatus.SUSPENDED,
              label: UserStatusTitles.getUserStatusTitle(UserStatus.SUSPENDED),
            },
          ]}
          disabled={loading}
          loading={loading}
          className="w-full"
        />
      </DynamicForm>
    </div>
  );
}
