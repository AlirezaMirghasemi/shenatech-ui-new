// interfaces/IDynamicInputField.ts
import { InputType } from "@/constants/data/InputType";
import {
  ChangeEventHandler,
  ComponentProps,
  FocusEventHandler,
  JSX,
} from "react";
import {
  FileInputProps,
  FloatingLabelColor,
  Textarea,
  TextInput,
} from "flowbite-react";
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
  color?: string | FloatingLabelColor;
};
type InputEventHandlers = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};
export interface IDynamicInputField extends CommonInputProps {
  type: InputType;
  data?: { value: number | string; label: string }[];
  multiple?: boolean;
  loading?: boolean;
  isSearchable?: boolean;
  autoComplete?: string;
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
export interface IDynamicTextInputProps
  extends CommonInputProps,
    InputEventHandlers {
  type:
    | InputType.TEXT
    | InputType.EMAIL
    | InputType.PASSWORD
    | InputType.NUMBER;
  addon?: JSX.Element;
  rightIcon?: IconType;
  loading?: boolean;
  value?: string | number;
  autoComplete?: string;
}
export interface IDynamicTextareaProps
  extends CommonInputProps,
    InputEventHandlers {
  type: InputType.TEXTAREA;
  value?: string;
  rows?: number;
  cols?: number;
  loading?: boolean;
  placeholder?: string;
}
export interface IDynamicFileInputProps
  extends CommonInputProps,
    InputEventHandlers {
  type: InputType.FILE;
  multiple?: boolean;
  value?: File | { path: string } | null;
  loading?: boolean;
  accept?: string;
}
export interface IDynamicImageInputProps
  extends CommonInputProps,
    InputEventHandlers {
  type: InputType.IMAGE;
  multiple?: boolean;
  value?: File | { path: string } | null;
  loading?: boolean;
  accept?: string;
}

export interface IDynamicHiddenInputProps extends CommonInputProps {
  type: InputType.HIDDEN;
  value?: string;
}
export interface IDynamicSelectInputProps
  extends CommonInputProps,
    InputEventHandlers {
  type: InputType.SELECT;
  data: { value: string | number; label: string }[];
  defaultValue?: string | number | Array<string | number>;
  multiple?: boolean;
  isSearchable?: boolean;
  loading?: boolean;
}
export interface IDynamicMultiTextInputProps extends CommonInputProps {
  type: InputType.MULTI_TEXT_INPUT;
  loading?: boolean;
  value?: string[];
  onChange: (value: string[]) => void;
  onBlur: () => void;
}
