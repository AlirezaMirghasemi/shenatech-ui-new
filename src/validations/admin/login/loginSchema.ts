import { validationMessages } from "@/utils/ValidationMessages";
import * as Yup from "yup";
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email(validationMessages.invalid("پست الکترونیکی"))
    .required(validationMessages.required("پست الکترونیکی")),

  password: Yup.string().required(validationMessages.required("رمز عبور")),
});
