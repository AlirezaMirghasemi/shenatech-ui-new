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
  FloatingLabel,
  FloatingLabelColor,
  Radio,
  Textarea,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";
import { IconType } from "react-icons/lib";
import { Schema } from "yup";

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
  validationSchema?: Schema;
};
type InputEventHandlers = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};
export interface IDynamicInputField extends CommonInputProps {
  data?: { value: number | string; label: string }[];
  multiple?: boolean;
  loading?: boolean;
  isSearchable?: boolean;
  autoComplete?: string;
  checked?: boolean;
  type: InputType;
  textInputProps?: Omit<
    ComponentProps<typeof TextInput>,
    "id" | "name" | "value" | "onChange" | "onBlur"
  >;
  textareaProps?: Omit<
    ComponentProps<typeof Textarea>,
    "id" | "name" | "value" | "onChange" | "onBlur"
  >;
  radioInputProps?: Omit<
    ComponentProps<typeof Radio>,
    "id" | "name" | "value" | "onChange" | "onBlur" | "defaultChecked"
  >;

  toggleSwitchProps?: Omit<
    ComponentProps<typeof ToggleSwitch>,
    "id" | "name" | "value" | "onChange" | "onBlur" | "checked"
  >;
  floatingLabelProps?: Omit<
    ComponentProps<typeof FloatingLabel>,
    "id" | "name" | "value" | "onChange" | "onBlur" | "label" | "variant"
  >;

  fileInputProps?: FileInputProps;
  hiddenInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
export interface IDynamicFloatingLabelProps
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
export interface IDynamicTextareaProps extends CommonInputProps {
  value?: string;
  rows?: number;
  cols?: number;
  loading?: boolean;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
}
export interface IDynamicFileInputProps
  extends CommonInputProps,
    InputEventHandlers {
  multiple?: boolean;
  value?: File | { path: string } | null;
  loading?: boolean;
  accept?: string;
}
export interface IDynamicImageInputProps
  extends CommonInputProps,
    InputEventHandlers {
  multiple?: boolean;
  value?: File | { path: string } | null;
  loading?: boolean;
  accept?: string;
}

export interface IDynamicHiddenInputProps extends CommonInputProps {
  value?: string;
}
export interface IDynamicSelectInputProps
  extends CommonInputProps,
    InputEventHandlers {
  data: { value: string | number; label: string }[];
  defaultValue?: string | number | Array<string | number>;
  multiple?: boolean;
  isSearchable?: boolean;
  loading?: boolean;
}
export interface IDynamicMultiTextInputProps extends CommonInputProps {
  loading?: boolean;
  value?: string[];
  onChange: (value: string[]) => void;
  onBlur: () => void;
  validateItem?: (value: string) => Promise<string | undefined>;
}
export interface IDynamicRadioInputProps
  extends CommonInputProps,
    InputEventHandlers {
  value?: string | number;
  defaultChecked?: boolean;
}
export interface IDynamicToggleSwitchProps
  extends CommonInputProps,
    InputEventHandlers {
  checked?: boolean;
  size?: string;
  ref?: React.Ref<HTMLInputElement> | undefined;
}
