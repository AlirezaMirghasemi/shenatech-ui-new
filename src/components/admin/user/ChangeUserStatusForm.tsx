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

export default function ChangeUserStatusForm({ user }: { user: User }) {
  const {
    actions: { editUserStatus,  },
    loading,

  } = useUser();
  const onSubmit = async (
    values: EditUserStatus,
    { setSubmitting }: FormikHelpers<EditUserStatus>
  ) => {
    try {
      await editUserStatus(user.id, values.status);

      toast.success("وضعیت کاربر با موفقیت ویرایش شد.");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("خطا در ویرایش وضعیت کاربر.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="max-w-lg absolute z-999  scroll-auto p-5  rounded-lg shadow dark:border  sm:max-w-md ">
        <DynamicForm
          initialValues={editUserStatusInitial({ status: user.status })}
          validationSchema={editUserStatusSchema()}
          buttonTitle="ویرایش وضعیت"
          onSubmit={onSubmit}
          validateOnChange={true}
          validateOnBlur={true}
          disabledButton={loading}
          submitButtonSize="sm"
          buttonClassName="w-50"
        >
          <DynamicInputField
            labelHidden={true}
            id={"status"}
            name={"status"}
            placeholder="وضعیت"
            label="وضعیت"
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
                label: UserStatusTitles.getUserStatusTitle(
                  UserStatus.SUSPENDED
                ),
              },
            ]}
            disabled={loading }
            loading={loading }
            className="w-50"
          />
        </DynamicForm>
      </div>
    </>
  );
}
