import { validationMessages } from "@/utils/ValidationMessages";
import * as Yup from "yup";

export const createRoleSchema = (
  checkRoleNameIsUnique: (roleName: string) => Promise<boolean>
) =>
  Yup.object().shape({
    name: Yup.string()
      .required(validationMessages.required("نام نقش"))
      .min(2, validationMessages.minLength(2))
      .max(50, validationMessages.maxLength(50))
      .matches(/^[a-zA-Z0-9_]+$/, validationMessages.matchEnglish)
      .test(
        "check-role-name-unique",
        validationMessages.unique("نام نقش"),
        async (value) => {
          if (value) {
            const isUnique = await checkRoleNameIsUnique(value);
            return isUnique;
          }
          return false;
        }
      ),
  });
