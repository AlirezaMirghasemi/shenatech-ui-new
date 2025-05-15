import DynamicCheckUniqueField from "@/helpers/CheckUniqueField";
import { validationMessages } from "@/utils/ValidationMessages";
import * as Yup from "yup";

export const editRoleSchema = (
  checkRoleNameIsUnique: (roleName: string) => Promise<boolean>,
  { currentRoleName }: { currentRoleName: string }
) =>
  Yup.object().shape({
    roleName: Yup.string()
      .required(validationMessages.required("نام نقش"))
      .min(2, validationMessages.minLength(2))
      .max(50, validationMessages.maxLength(50))
      .matches(/^[a-zA-Z0-9_]+$/, validationMessages.matchEnglish)
      .test(
        "check-role-name-unique",
        validationMessages.unique("نام نقش"),
        async (value) => {
          if (value == currentRoleName ) return true;
          if (value) {
            const isUnique = await DynamicCheckUniqueField({
              fieldValue: value,
              checkUniqueFunction: checkRoleNameIsUnique,
            });
            return isUnique;
          }
          return false;
        }
      ),
  });
