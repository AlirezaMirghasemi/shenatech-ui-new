import { Gender } from "@/constants/data/Gender";
import { UserStatus } from "@/constants/data/UserStatus";
//import DynamicCheckUniqueField from "@/helpers/CheckUniqueField";
import { Image } from "@/types/Image";
import { validationMessages } from "@/utils/ValidationMessages";
import * as Yup from "yup";

export const createUserSchema =
  // =
  //(
  //   checkUserNameIsUnique: (userName: string) => Promise<boolean>,
  //   checkEmailIsUnique: (email: string) => Promise<boolean>,
  //   checkMobileIsUnique: (mobile: string) => Promise<boolean>
  //)
  //>
  Yup.object().shape({
    username: Yup.string()
      .required(validationMessages.required("نام کاربری"))
      .min(2, validationMessages.minLength(2))
      .max(50, validationMessages.maxLength(50))
      .matches(/^[a-zA-Z0-9_]+$/, validationMessages.matchEnglish),
    //   .test(
    //     "check-user-name-unique",
    //     validationMessages.unique("نام کاربری"),
    //     async (value) => {
    //       if (value) {
    //         const isUnique = await DynamicCheckUniqueField({
    //           fieldValue: value,
    //           checkUniqueFunction: checkUserNameIsUnique,
    //         });
    //         return isUnique;
    //       }
    //       return false;
    //     }
    //   ),
    email: Yup.string()
      .required(validationMessages.required("ایمیل"))
      .email(validationMessages.invalidEmail),
    //   .test(
    //     "check-email-unique",
    //     validationMessages.unique("ایمیل"),
    //     async (value) => {
    //       if (value) {
    //         const isUnique = await DynamicCheckUniqueField({
    //           fieldValue: value,
    //           checkUniqueFunction: checkEmailIsUnique,
    //         });
    //         return isUnique;
    //       }
    //       return false;
    //     }
    //   ),
    mobile: Yup.string()
      .nullable()
      .required(validationMessages.required("شماره موبایل"))
      .matches(/^(\+?98|0)9\d{9}$/, validationMessages.invalidMobile),
    //   .test(
    //     "check-mobile-unique",
    //     validationMessages.unique("شماره موبایل"),
    //     async (value) => {
    //       if (value) {
    //         const isUnique = await DynamicCheckUniqueField({
    //           fieldValue: value,
    //           checkUniqueFunction: checkMobileIsUnique,
    //         });
    //         return isUnique;
    //       }
    //       return false;
    //     }
    //   ),
    password: Yup.string()
      .min(8, validationMessages.minLength(8))
      .required(validationMessages.required("رمز عبور"))
      .matches(/(?=.*[a-z])/, "رمز عبور باید شامل حداقل یک حرف کوچک باشد")
      .matches(/(?=.*[A-Z])/, "رمز عبور باید شامل حداقل یک حرف بزرگ باشد")
      .matches(
        /(?=.*[!@#$%^&*])/,
        "رمز عبور باید شامل حداقل یک علامت خاص باشد"
      ),
    password_confirmation: Yup.string()
      .nullable()
      .default(null)
      .oneOf([Yup.ref("password"), null], validationMessages.passwordMismatch)
      .transform((value) => (value === undefined ? null : value)),
    gender: Yup.string()
      .oneOf(Object.values(Gender))
      .default(Gender.NotSpecified),
    status: Yup.string()
      .oneOf(Object.values(UserStatus))
      .default(UserStatus.PENDING),
    profile_image: Yup.mixed<Image>()
      .nullable()
      .defined()
      .notRequired()
      .default(null)
      .test("fileSize", "حجم فایل نباید از 2 مگابایت بیشتر باشد", (value) => {
        if (!value) return true;
        console.log(value);
        if (value && value.size != null) {
          return value.size <= 2 * 1024 * 1024;
        }
        return true;
      })
      .test("fileType", "فرمت فایل باید JPEG یا PNG باشد", (value) => {
        if (!value) return true;
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
