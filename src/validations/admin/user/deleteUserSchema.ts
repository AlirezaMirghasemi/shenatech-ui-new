import { validationMessages } from "@/utils/ValidationMessages";
import * as Yup from "yup";

export const deleteUserSchema = Yup.object().shape({
    userId: Yup.number().required(validationMessages.required("کاربر")),
  removeProfilePicture: Yup.boolean().default(false),
  removeRoles: Yup.boolean().default(false)
});
