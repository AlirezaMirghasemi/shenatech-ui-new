import { EditUser, User } from "@/types/User";
import DynamicForm from "../dynamics/DynamicForm";
import DynamicInputField from "../dynamics/dynamicFormInputs/DynamicInputField";
import { InputType } from "@/constants/data/InputType";
import { Gender, GenderTitles } from "@/constants/data/Gender";
import { UserStatus, UserStatusTitles } from "@/constants/data/UserStatus";
import FullNameSync from "./FullNameSync";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import { FormikHelpers } from "formik";
import { editUserInitial } from "@/validations/admin/user/editUserInitial";
import { editUserSchema } from "@/validations/admin/user/editUserSchema";

export default function EditUserForm({
  onCloseEditUserModal,
  user,
}: {
  onCloseEditUserModal: () => void;
  user: User;
}) {
  const {
    actions: { editUser, checkFieldIsUnique },
    statuses: { isEditing, isCheckingUniqueness },
  } = useUser();
  const onSubmit = async (
    values: EditUser,
    { setSubmitting }: FormikHelpers<EditUser>
  ) => {
    try {
      await editUser(user.id, values, values.profile_image as File | undefined);
      onCloseEditUserModal();
      toast.success("کاربر با موفقیت ویرایش شد.");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("خطا در ویرایش کاربر.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <div className="max-h-auto relative max-h-full w-full max-w-lg p-4">
        <div className="relative rounded-lg">
          <DynamicForm
            initialValues={editUserInitial({ user })}
            validationSchema={editUserSchema(
              (fieldValue: string, fieldName: string) =>
                checkFieldIsUnique({ fieldValue, fieldName }),
              { currentUser: user }
            )}
            buttonTitle="ویرایش کاربر"
            onSubmit={onSubmit}
            buttonClassName="flex flex-row m-auto w-full cursor-pointer "
            submitButtonColor="warning"
            validateOnChange={false}
            validateOnBlur={true}
            disabledButton={isEditing || isCheckingUniqueness}
          >
            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="col-span-2">
                <DynamicInputField
                  id="username"
                  name="username"
                  placeholder="نام کاربری"
                  label="نام کاربری"
                  type={InputType.TEXT}
                  disabled={isEditing || isCheckingUniqueness}
                  className="block w-full"
                  loading={isEditing || isCheckingUniqueness}
                  autoComplete="username"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <DynamicInputField
                  id="first_name"
                  name="first_name"
                  placeholder="نام کوچک"
                  label="نام کوچک"
                  type={InputType.TEXT}
                  className="block w-full"
                  disabled={isEditing || isCheckingUniqueness}
                  loading={isEditing || isCheckingUniqueness}
                  autoComplete="given-name"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <DynamicInputField
                  id="last_name"
                  name="last_name"
                  placeholder="نام خانوادگی"
                  label="نام خانوادگی"
                  className="block w-full"
                  type={InputType.TEXT}
                  disabled={isEditing || isCheckingUniqueness}
                  loading={isEditing || isCheckingUniqueness}
                  autoComplete="family-name"
                />
              </div>
              <div className="col-span-2">
                <DynamicInputField
                  id="full_name"
                  name="full_name"
                  placeholder="نام کامل"
                  label="نام کامل"
                  type={InputType.TEXT}
                  readOnly
                  loading={isEditing || isCheckingUniqueness}
                  className="w-full"
                />
              </div>

              <div className="col-span-2">
                <DynamicInputField
                  id="email"
                  name="email"
                  placeholder="ایمیل"
                  label="ایمیل"
                  type={InputType.EMAIL}
                  disabled={isEditing || isCheckingUniqueness}
                  loading={isEditing || isCheckingUniqueness}
                  className="block w-full"
                  autoComplete="email"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <DynamicInputField
                  id="mobile"
                  name="mobile"
                  placeholder="شماره موبایل"
                  label="شماره موبایل"
                  type={InputType.TEXT}
                  disabled={isEditing || isCheckingUniqueness}
                  className="block w-full"
                  loading={isEditing || isCheckingUniqueness}
                  autoComplete="tel"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <DynamicInputField
                  id="gender"
                  name="gender"
                  placeholder="جنسیت"
                  label="جنسیت"
                  type={InputType.SELECT}
                  className="block w-full"
                  data={[
                    {
                      value: Gender.Male,
                      label: GenderTitles.getGenderTitle(Gender.Male),
                    },
                    {
                      value: Gender.Female,
                      label: GenderTitles.getGenderTitle(Gender.Female),
                    },
                    {
                      value: Gender.NotSpecified,
                      label: GenderTitles.getGenderTitle(Gender.NotSpecified),
                    },
                  ]}
                  disabled={isEditing || isCheckingUniqueness}
                  loading={isEditing || isCheckingUniqueness}
                />
              </div>
              <div className="col-span-2">
                <DynamicInputField
                  id="bio"
                  name="bio"
                  placeholder="بیوگرافی"
                  label="بیوگرافی"
                  type={InputType.TEXTAREA}
                  disabled={isEditing || isCheckingUniqueness}
                  className="block w-full"
                  loading={isEditing || isCheckingUniqueness}
                />
              </div>

              <DynamicInputField
                id="profile_image"
                name="profile_image"
                placeholder="عکس پروفایل"
                label="عکس پروفایل"
                type={InputType.IMAGE}
                className="mb-5"
                loading={isEditing || isCheckingUniqueness}
                disabled={isEditing || isCheckingUniqueness}
              />

              <div className="col-span-2 sm:col-span-1">
                <DynamicInputField
                  id="status"
                  name="status"
                  placeholder="وضعیت"
                  label="وضعیت"
                  className="block w-full"
                  type={InputType.SELECT}
                  data={[
                    {
                      value: UserStatus.PENDING,
                      label: UserStatusTitles.getUserStatusTitle(
                        UserStatus.PENDING
                      ),
                    },
                    {
                      value: UserStatus.ACTIVE,
                      label: UserStatusTitles.getUserStatusTitle(
                        UserStatus.ACTIVE
                      ),
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
                  disabled={isEditing || isCheckingUniqueness}
                  loading={isEditing || isCheckingUniqueness}
                />
              </div>
            </div>
            <FullNameSync />
          </DynamicForm>
        </div>
      </div>
    </>
  );
}
