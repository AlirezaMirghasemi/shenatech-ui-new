import { validationMessages } from "@/utils/ValidationMessages";
import * as Yup from "yup";
export const assignPermissionSchema = Yup.object().shape({
  permissionIds: Yup.array()
    .of(Yup.number().required(validationMessages.required("مجوز")))
    .required(validationMessages.required("مجوز"))
    .min(1, validationMessages.required("مجوز")),
});
