import { validationMessages } from "@/utils/ValidationMessages";
import * as Yup from "yup";

export const createTagsSchema = (
  checkTagTitleIsUnique: ({ title }: { title: string }) => Promise<boolean>
) => {
  const tagSchema = Yup.string()
    .required(validationMessages.required("عنوان هشتگ"))
    .min(2, validationMessages.minLength(2))
    .max(50, validationMessages.maxLength(50))
    .test(
      "check-tag-title-unique",
      validationMessages.unique("عنوان هشتگ"),
      async (title) => {
        if (title) {
          const isUnique = await checkTagTitleIsUnique({ title });
          return isUnique;
        }
        return false;
      }
    );

  return Yup.object().shape({
    titles: Yup.array()
      .required(validationMessages.required("عنوان هشتگ"))
      .min(1, validationMessages.required("عنوان هشتگ"))
      .of(tagSchema),
  });
};
