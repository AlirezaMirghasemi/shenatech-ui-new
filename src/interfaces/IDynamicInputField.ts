// interfaces/IDynamicInputField.ts
import { InputType } from "@/constants/data/InputType";
import { ChangeEventHandler, ComponentProps, JSX } from "react";
import {  FileInputProps, Textarea, TextInput } from "flowbite-react";
import { IconType } from "react-icons/lib";

type CommonInputProps = {
  id: string;
  name: string;
  label?: string;
  labelHidden?: boolean;
  disabled?: boolean;
  className?: string;
  readOnly?: boolean;
  placeholder?: string;
  helperText?: string;
};

export interface IDynamicInputField extends CommonInputProps {
  type: InputType;
  data?: { value: number | string; label: string }[];
  multiple?: boolean;
  loading?: boolean;
  isSearchable?: boolean;

  textInputProps?: Omit<
    ComponentProps<typeof TextInput>,
    "id" | "name" | "value" | "onChange" | "onBlur"
  >;
  textareaProps?: Omit<
    ComponentProps<typeof Textarea>,
    "id" | "name" | "value" | "onChange" | "onBlur"
  >;
  fileInputProps?: FileInputProps;
  hiddenInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
export interface IDynamicTextInputProps extends CommonInputProps {
  type:
    | InputType.TEXT
    | InputType.EMAIL
    | InputType.PASSWORD
    | InputType.NUMBER;
  addon?: JSX.Element;
  rightIcon?: IconType;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  color?: string;
}
export interface IDynamicTextareaProps extends CommonInputProps {
  type: InputType.TEXTAREA;
  value?: string;
  rows?: number;
  cols?: number;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: ChangeEventHandler<HTMLTextAreaElement>;
  color?: string;
}
export interface IDynamicFileInputProps extends CommonInputProps {
  type: InputType.FILE;
  multiple?: boolean;
  value?: File | File[] | null;
  color?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
export interface IDynamicHiddenInputProps extends CommonInputProps {
  type: InputType.HIDDEN;
  value?: string;
}
export interface IDynamicSelectInputProps extends CommonInputProps {
  type: InputType.SELECT;
  data: { value: string | number; label: string }[];
  defaultValue?: string | number | Array<string | number>;
  multiple?: boolean;
  isSearchable?: boolean;
  loading?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  onBlur?: ChangeEventHandler<HTMLSelectElement>;
}
