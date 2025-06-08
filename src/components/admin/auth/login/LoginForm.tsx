"use client";
import DynamicForm from "@/components/admin/dynamics/DynamicForm";
import DynamicInputField from "@/components/admin/dynamics/DynamicInputField";
import { InputType } from "@/constants/data/InputType";
import { LoginCredentials } from "@/types/Auth";
import Image from "next/image";
import { FormikHelpers } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { loginInitial } from "@/validations/admin/login/loginInitial";
import { loginSchema } from "@/validations/admin/login/loginSchema";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin/dashboard";

  const { actions, isLoading } = useAuth();
  const onSubmit = async (
    values: LoginCredentials,
    { setSubmitting }: FormikHelpers<LoginCredentials>
  ) => {
    try {
      await actions.login(values);
      await actions.loadUser();
      toast.success("ورود موفقیت‌آمیز بود.");
      await router.push(redirect);
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
              className="  rounded-lg  block w-full p-0.2 mb-2 text-text-link "
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
