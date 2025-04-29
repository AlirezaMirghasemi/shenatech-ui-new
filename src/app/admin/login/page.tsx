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
      <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl  text-center">
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
              className="  rounded-lg  block w-full p-0.2 mb-2"
            />
            <DynamicInputField
              id="password"
              name="password"
              type={InputType.PASSWORD}
              placeholder="رمز عبور"
              label="رمز عبور"
              disabled={isLoading}
              className="  rounded-lg  block w-full p-0.2 mb-2"
            />
          </DynamicForm>
        </div>
      </div>
    </>
  );
}
