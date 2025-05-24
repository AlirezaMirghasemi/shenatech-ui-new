import { validationMessages } from "@/utils/ValidationMessages";
import * as Yup from "yup";
export const assignPermissionsToRoleSchema = Yup.object().shape({
  roleId: Yup.number().required(validationMessages.required("نقش")),
});
