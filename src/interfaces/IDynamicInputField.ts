// interfaces/IDynamicInputField.ts
import { InputType } from "@/constants/data/InputType";
import { ComponentProps } from "react";
import { FileInput, Select, Textarea, TextInput } from "flowbite-react";

// حذف props های تکراری که مستقیماً مدیریت می‌شوند
type OmittedProps =
  | "id"
  | "name"
  | "type"
  | "placeholder"
  | "label"
  | "disabled"
  | "data"
  | "className"
  | "multiple"
  | "defaultValue"
  | "loading"
  | "helperText"
  | "color"
  | "onChange"
  | "onBlur"
  | "value";

export default interface IDynamicInputField {
  id: string;
  name: string;
  type?: InputType;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  data?: { id: number | string; name: string }[];
  className?: string;
  labelHidden?: boolean;
  multiple?: boolean;
  defaultValue?: string | number;
  loading?: boolean;
  helperText?: string;
  readOnly?: boolean;
  // اضافه کردن props اختصاصی برای انواع مختلف
  textInputProps?: Omit<ComponentProps<typeof TextInput>, OmittedProps>;
  textareaProps?: Omit<ComponentProps<typeof Textarea>, OmittedProps>;
  selectProps?: Omit<ComponentProps<typeof Select>, OmittedProps>;
  fileInputProps?: Omit<ComponentProps<typeof FileInput>, OmittedProps> & React.InputHTMLAttributes<HTMLInputElement>;
  hiddenInputProps?: Omit<ComponentProps<"input">, OmittedProps>;
}
