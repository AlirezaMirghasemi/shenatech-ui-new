import { validationMessages } from "@/utils/ValidationMessages";
import * as Yup from "yup";

export const createTagsSchema = (
  checkTagTitleIsUnique: (title: string) => Promise<boolean>
) => {
  const tagSchema = Yup.string()
    .required(validationMessages.required("عنوان هشتگ"))
    .min(2, validationMessages.minLength(2))
    .max(50, validationMessages.maxLength(50))
    .test(
      "check-tag-title-unique",
      validationMessages.unique("عنوان هشتگ"),
     async (title, context) => {
        if (!title || title.length < 2) return true;

        try {
          return await checkTagTitleIsUnique(title);
        } catch  {
          // Use form context to create custom error
          return context.createError({
            message: "خطا در ارتباط با سرور برای بررسی یکتایی"
          });
        }
      }
    );

  return Yup.object().shape({
    titles: Yup.array()
      .of(tagSchema)
      .min(1, "حداقل یک عنوان وارد کنید")
      .required("وارد کردن عنوان الزامی است"),
  });
};
