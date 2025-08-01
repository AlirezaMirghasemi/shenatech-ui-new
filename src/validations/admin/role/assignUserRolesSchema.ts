import { validationMessages } from "@/utils/ValidationMessages";
import * as Yup from "yup";

export const assignUserRolesSchema = Yup.object().shape({
  roleIds: Yup.array()
    .of(Yup.number().required(validationMessages.required("نقش ها")))
    .required(validationMessages.required("نقش ها"))
    .min(1, validationMessages.required("نقش ها")),
});
