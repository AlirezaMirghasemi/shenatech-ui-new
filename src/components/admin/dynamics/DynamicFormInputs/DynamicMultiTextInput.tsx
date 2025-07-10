"use client";
import { IDynamicMultiTextInputProps } from "@/interfaces/IDynamicInputField";
import { customSelectStyles } from "@/theme/SelectInputTheme";
import { useFormikContext } from "formik";
import { KeyboardEventHandler, useState } from "react";
import { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";

export default function DynamicMultiTextInput({
  id,
  name,
  placeholder,
  disabled,
  className,
  value = [],
  loading,
  onChange,
  onBlur,
  validateItem,
}: IDynamicMultiTextInputProps) {
  const { setFieldError, setFieldTouched } = useFormikContext();
  const [inputValue, setInputValue] = useState("");

  const createOption = (label: string) => ({
    label,
    value: label,
  });

  interface Option {
    value: string;
  }
  const selectedValues = value.map((option) => createOption(option));

  const handleChange: (newValue: MultiValue<unknown>) => void = (newValue) => {
    onChange(newValue.map((v) => (v as Option).value));
  };

  const handleBlur = () => {
    onBlur();
    setFieldTouched(id, true);
  };
  const handleKeyDown: KeyboardEventHandler = async (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        event.preventDefault();
        if (value.includes(inputValue)) {
          setFieldError(id, "این مقدار قبلا وارد شده است");
          return;
        }
        if (validateItem) {
          const error = await validateItem(inputValue);
          if (error) {
            setFieldError(id, error);
            return;
          }
        }
        onChange([...value, inputValue]);
        setInputValue("");
        setFieldError(id, undefined);
        break;
    }
  };

  return (
    <>
      <CreatableSelect
        components={{ DropdownIndicator: null }}
        inputId={id}
        instanceId={id}
        name={name}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={handleChange}
        onInputChange={(newValue) => {
          setInputValue(newValue);
          setFieldError(id, undefined);
        }}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={placeholder}
        loadingMessage={() => "در حال بارگذاری..."}
        styles={customSelectStyles}
        isLoading={loading}
        value={selectedValues}
        isDisabled={disabled}
        className={className}
      />
    </>
  );
}
