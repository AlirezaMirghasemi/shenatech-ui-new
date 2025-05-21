// createPermissionSchema.ts
import {
  Actions,
  Assigned,
  TableNames,
} from "@/constants/data/ManagePermissions";
import { validationMessages } from "@/utils/ValidationMessages";
import * as Yup from "yup";

export const createPermissionSchema = (isUnique: boolean) =>
  Yup.object().shape({
    permissionName: Yup.string()
      .required(validationMessages.required("نام مجوز"))
      .test("isUnique", validationMessages.unique("نام مجوز"), async () => {
        console.log("isUnique:", isUnique);
        return isUnique;
      }),
    permissionViewName: Yup.string()
      .required(validationMessages.required("نام مجوز"))
      .test("isUnique", validationMessages.unique("نام مجوز"), async () => {
        console.log("isUnique:", isUnique);
        return isUnique;
      }),
    actionName: Yup.mixed<Actions>()
      .oneOf(Object.keys(Actions) as Actions[])
      .required(validationMessages.required("عملیات")),
    assignedName: Yup.mixed<Assigned>()
      .oneOf(Object.keys(Assigned) as Assigned[])
      .required(validationMessages.required("تخصیص")),
    tableName: Yup.mixed<TableNames>()
      .oneOf(Object.keys(TableNames) as TableNames[])
      .required(validationMessages.required("نام جدول")),
  });
