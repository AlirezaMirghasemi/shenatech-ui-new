import { Gender } from "@/constants/data/Gender";
import { UserStatus } from "@/constants/data/UserStatus";
import { User } from "@/types/User";
//import DynamicCheckUniqueField from "@/helpers/CheckUniqueField";
import { validationMessages } from "@/utils/ValidationMessages";
import * as Yup from "yup";

export const editUserSchema = (
  checkFieldIsUnique: (
    fieldValue: string,
    fieldName: string
  ) => Promise<boolean>,
  { currentUser }: { currentUser: User }
) => {
  const uniquenessCache: Record<string, boolean> = {};
  const checkUniqueness = async (
    value: string | null,
    fieldName: string
  ): Promise<boolean> => {
    if (!value) return false;
    if (value == currentUser[fieldName as keyof User]) return true;
    const cacheKey = `${fieldName}:${value}`;

    if (uniquenessCache[cacheKey] !== undefined) {
      return uniquenessCache[cacheKey];
    }

    const isUnique = await checkFieldIsUnique(value, fieldName);
    uniquenessCache[cacheKey] = isUnique;
    return isUnique;
  };

  return Yup.object().shape({
    username: Yup.string()
      .required(validationMessages.required("نام کاربری"))
      .min(2, validationMessages.minLength(2))
      .max(50, validationMessages.maxLength(50))
      .matches(/^[a-zA-Z0-9_]+$/, validationMessages.matchEnglish)
      .test(
        "check-user-name-unique",
        validationMessages.unique("نام کاربری"),
        async (value) => checkUniqueness(value, "username")
      ),
    email: Yup.string()
      .required(validationMessages.required("ایمیل"))
      .email(validationMessages.invalidEmail)
      .test(
        "check-email-unique",
        validationMessages.unique("ایمیل"),
        async (value) => checkUniqueness(value, "email")
      ),
    mobile: Yup.string()
      .nullable()
      .required(validationMessages.required("شماره موبایل"))
      .matches(/^(\+?98|0)9\d{9}$/, validationMessages.invalidMobile)
      .test(
        "check-mobile-unique",
        validationMessages.unique("شماره موبایل"),
        async (value) => checkUniqueness(value, "mobile")
      ),
    gender: Yup.string()
      .oneOf(Object.values(Gender))
      .default(Gender.NotSpecified),
    status: Yup.string()
      .oneOf(Object.values(UserStatus))
      .default(UserStatus.PENDING),
    profile_image: Yup.mixed<File>()
      .nullable()
      .default(null)
      .test("fileSize", "حجم فایل نباید از 2 مگابایت بیشتر باشد", (value) => {
        if (!value || !(value instanceof File)) return true;
        return value.size <= 2 * 1024 * 1024;
         })
         .test("fileType", "فرمت فایل باید JPEG یا PNG باشد", (value) => {
           if (!value || !(value instanceof File)) return true;
           return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
         }),
    first_name: Yup.string()
      .nullable()
      .default(null)
      .min(3, validationMessages.minLength(3))
      .max(50, validationMessages.maxLength(50)),
    last_name: Yup.string()
      .nullable()
      .default(null)
      .min(3, validationMessages.minLength(3))
      .max(50, validationMessages.maxLength(50)),
    full_name: Yup.string().nullable().default(null),
    bio: Yup.string()
      .nullable()
      .max(250, validationMessages.maxLength(250))
      .default(null),
  });
};
