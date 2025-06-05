import { UserStatus } from "@/constants/data/UserStatus";
import { validationMessages } from "@/utils/ValidationMessages";
import * as Yup from "yup";

export const editUserStatusSchema = () =>
  Yup.object().shape({
    status: Yup.string()
      .required(validationMessages.required("وضعیت"))
      .oneOf(Object.values(UserStatus)),
  });
