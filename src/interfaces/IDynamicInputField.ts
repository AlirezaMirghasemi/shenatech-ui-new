// interfaces/IDynamicInputField.ts
import { InputType } from "@/constants/data/InputType";
import { JSX, Ref } from "react";
import {
  FileInputProps,
  FloatingLabelColor,
  FloatingLabelProps,
  RadioProps,
  TextareaProps,
  TextInputProps,
  ToggleSwitchProps,
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
  size?: string | number | undefined;
  ref?: Ref<HTMLInputElement> | undefined ;

};

export interface IDynamicInputField extends CommonInputProps {
  data?: { value: number | string; label: string }[];
  multiple?: boolean;
  loading?: boolean;
  isSearchable?: boolean;
  autoComplete?: string;
  checked?: boolean;
  type: InputType;
  textInputProps?: TextInputProps;
  textareaProps?: TextareaProps;
  radioInputProps?: RadioProps;
  toggleSwitchProps?: ToggleSwitchProps;
  floatingLabelProps?: FloatingLabelProps;
  fileInputProps?: FileInputProps;
  hiddenInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  eventHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface IDynamicFloatingLabelProps extends CommonInputProps {
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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;


}
export interface IDynamicTextareaProps extends CommonInputProps {
  value?: string;
  rows?: number;
  cols?: number;
  loading?: boolean;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export interface IDynamicFileInputProps extends CommonInputProps {
  multiple?: boolean;
  value?: File | { path: string } | null;
  loading?: boolean;
  accept?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface IDynamicImageInputProps extends CommonInputProps {
  multiple?: boolean;
  value?: File | { path: string } | null;
  loading?: boolean;
  accept?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IDynamicHiddenInputProps extends CommonInputProps {
  value?: string;
}
export interface IDynamicSelectInputProps extends CommonInputProps {
  data: { value: string | number; label: string }[];
  defaultValue?: string | number | Array<string | number>;
  multiple?: boolean;
  isSearchable?: boolean;
  loading?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;

}
export interface IDynamicMultiTextInputProps extends CommonInputProps {
  loading?: boolean;
  value?: string[];
  //onChange: (value: string[]) => void;
  onBlur: () => void;
  validateItem?: (value: string) => Promise<string | undefined>;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;

}
export interface IDynamicRadioInputProps extends CommonInputProps {
  value?: string | number;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface IDynamicToggleSwitchProps extends CommonInputProps {
  checked?: boolean;
  size?: string;
  ref?: React.Ref<HTMLInputElement> | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
