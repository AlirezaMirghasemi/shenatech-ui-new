import { useTag } from "@/hooks/useTag";
import { CreateTags } from "@/types/Tag";
import { FormikHelpers } from "formik";
import { toast } from "sonner";
import DynamicForm from "../dynamics/DynamicForm";
import DynamicInputField from "../dynamics/dynamicFormInputs/DynamicInputField";
import { InputType } from "@/constants/data/InputType";
import { createTagsInitial } from "@/validations/admin/tag/createTagsInitial";
import { createTagsSchema } from "@/validations/admin/tag/createTagsSchema";

export default function CreateTagForm({
  onCloseCreateTagModal,
}: {
  onCloseCreateTagModal: () => void;
}) {
  const {
    actions: { createTags, isTagUnique },
    statuses:{isCheckingUniqueness,isCreating}
 } = useTag();
  const onSubmit = async (
    values: CreateTags,
    { setSubmitting }: FormikHelpers<CreateTags>
  ) => {
    try {
      await createTags(values);
      onCloseCreateTagModal();
      toast.success("هشتگ ها با موفقیت ایجاد شدند.");
    } catch (error) {
      console.error("Error creating Tags:", error);
      toast.error("خطا در ایجاد هشتگ ها.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DynamicForm
      initialValues={createTagsInitial}
      validationSchema={createTagsSchema(isTagUnique)}
      buttonTitle="ایجاد هشتگ ها"
      onSubmit={onSubmit}
      validateOnChange={true}
      validateOnBlur={true}
      disabledButton={isCheckingUniqueness || isCreating}
    >
      <DynamicInputField
        id="titles"
        name="titles"
        placeholder="عنوان هشتگ ها"
        label="عنوان هشتگ ها"
        type={InputType.MULTI_TEXT_INPUT}
        disabled={isCheckingUniqueness || isCreating}
        loading={isCheckingUniqueness || isCreating}
        validationSchema={createTagsSchema(isTagUnique)}
        spaceAllowed={false}
      />
    </DynamicForm>
  );
}
