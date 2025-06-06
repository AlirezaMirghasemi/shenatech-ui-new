import { validationMessages } from "@/utils/ValidationMessages";
import * as Yup from "yup";
export const assignRoleToUsersSchema = Yup.object().shape({
   userIds: Yup.array()
    .of(Yup.number().required(validationMessages.required("انتخاب حداقل یک کاربر")))
    .required(validationMessages.required("انتخاب حداقل یک کاربر"))
    .default([] as number[])
    .min(1, validationMessages.required("انتخاب حداقل یک کاربر"))
});
