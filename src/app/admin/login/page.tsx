"use client";
import DynamicForm from "@/components/admin/dynamics/DynamicForm";
import { LoginCredentials } from "@/types/Auth";
import { loginInitial } from "@/validations/admin/login/loginInitial";
import { loginSchema } from "@/validations/admin/login/loginSchema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { FormikValues, FormikHelpers } from "formik";
import DynamicInputField from "@/components/admin/dynamics/DynamicInputField";
import { InputType } from "@/constants/data/InputType";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const { actions, isLoading } = useAuth();
  const onSubmit = async (
    values: FormikValues,
    { setSubmitting }: FormikHelpers<FormikValues>
  ) => {
    try {
      await actions.login(values as LoginCredentials);
      await actions.loadUser();
      toast.success("ورود موفقیت‌آمیز بود.");
      await router.replace("/admin/dashboard");
    } catch {
      toast.error("ورود ناموفق! اطلاعات وارد شده صحیح نیست.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <div className="flex items-center mb-6 ">
        <Image src="/shenatech_logo.png" alt="logo" width={150} height={100} />
      </div>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            ورود به حساب کاربری
          </h1>
          <DynamicForm
            initialValues={loginInitial}
            validationSchema={loginSchema}
            onSubmit={onSubmit}
            buttonTitle="ورود"
          >
            <DynamicInputField
              id="email"
              name="email"
              type={InputType.EMAIL}
              placeholder="ایمیل"
              label="ایمیل"
              disabled={isLoading}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-0.2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  mb-2"
            />
            <DynamicInputField
              id="password"
              name="password"
              type={InputType.PASSWORD}
              placeholder="رمز عبور"
              label="رمز عبور"
              disabled={isLoading}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-0.2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
            />
          </DynamicForm>
        </div>
      </div>
    </>
  );
}
