import { InputType } from "@/constants/data/InputType";
import { FileInput, Select, Textarea, TextInput } from "flowbite-react";
import { ComponentProps } from "react";
type BaseInputProps = ComponentProps<"input"> &
  ComponentProps<typeof TextInput> &
  ComponentProps<typeof Textarea> &
  ComponentProps<typeof Select> &
  ComponentProps<typeof FileInput>;
export default interface IDynamicInputField extends BaseInputProps{
  id: string;
  name: string;
  type?: InputType;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  data?: { id: number | string; name: string }[];
  className?: string;
  multiple?: boolean;
  defaultValue?: string | number;
  loading?: boolean;
}
